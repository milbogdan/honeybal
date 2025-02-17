package com.example.backend_app.user.services;

import com.example.backend_app.auth.services.JwtService;
import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.mappers.UserMapper;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    public UserDTO getUserFromToken(String token) {
        String username = jwtService.extractUsername(token);
        return userMapper.usertoUserDTO(userRepository.findByEmail(username).orElseThrow(() -> new ExceptionBadRequest("User not found!")));
    }

    public Page<UserDTO> getAll(int page, int pageSize,String search,Boolean isVerified) {
        Pageable pageable = PageRequest.of(page,pageSize);
        Page<User> users = userRepository.findAllSearchAndFilters(search,pageable,isVerified);
        List<UserDTO> userDTOS = userMapper.usertoUserDTOs(users.getContent());
        return new PageImpl<>(userDTOS, pageable, users.getTotalElements());
    }

    public UserDTO getById(Long id) {
        return userMapper.usertoUserDTO(userRepository.findById(id).orElseThrow(() -> new ExceptionBadRequest("User not found!")));
    }
}
