package com.example.backend_app.auth.controllers;

import com.example.backend_app.auth.DTOs.AuthenticationRequest;
import com.example.backend_app.auth.DTOs.AuthenticationResponse;
import com.example.backend_app.auth.DTOs.RegisterRequest;
import com.example.backend_app.auth.services.AuthService;
import com.example.backend_app.auth.services.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request, HttpServletResponse response){
        authService.registerUser(request,response);
        return ResponseEntity.ok("Register successfull!");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request,HttpServletResponse response){
        authService.authenticate(request,response);
        return ResponseEntity.ok("Login successfull!");
    }
}
