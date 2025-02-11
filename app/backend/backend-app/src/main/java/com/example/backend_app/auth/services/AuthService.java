package com.example.backend_app.auth.services;

import com.example.backend_app.auth.DTOs.AuthenticationRequest;
import com.example.backend_app.auth.DTOs.AuthenticationResponse;
import com.example.backend_app.auth.DTOs.RegisterRequest;
import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.exception.ExceptionConflict;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationResponse registerUser(RegisterRequest user) {
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new ExceptionConflict("Account with this email already exists");
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setUsername(user.getUsername());
        userRepository.save(newUser);
        Map<String, Object> claims =  new HashMap<>();
        claims.put("role",newUser.getRole());
        claims.put("id",newUser.getId());
        var jwtToken = jwtService.generateToken(claims, newUser);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        if(!userRepository.existsByEmail(authenticationRequest.getEmail()) && !userRepository.existsByUsername(authenticationRequest.getEmail())) {
            throw new ExceptionBadRequest("User Not Found");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();

        Map<String, Object> claims =  new HashMap<>();
        claims.put("role",user.getRole());
        claims.put("id",user.getId());
        return new AuthenticationResponse(jwtService.generateToken(claims,user));

    }

}
