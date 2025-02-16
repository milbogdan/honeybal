package com.example.backend_app.user.services;

import com.example.backend_app.auth.services.JwtService;
import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.mappers.UserMapper;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserDTO getUserFromToken(String token) {
        String username = jwtService.extractClaim(token,Claims::getSubject);
        return UserMapper.INSTANCE.usertoUserDTO(userRepository.findByUsername(username).orElseThrow(() -> new ExceptionBadRequest("User not found!")));
    }
}
