package com.example.backend_app.auth.services;

import com.example.backend_app.auth.DTOs.AuthenticationRequest;
import com.example.backend_app.auth.DTOs.AuthenticationResponse;
import com.example.backend_app.auth.DTOs.RegisterRequest;
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
            //user already exists -exception
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
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
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        var user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        if(user == null) {
            return null;
            //user not found -exception
        }
        Map<String, Object> claims =  new HashMap<>();
        claims.put("role",user.getRole());
        claims.put("id",user.getId());
        return new AuthenticationResponse(jwtService.generateToken(claims,user));

    }

}
