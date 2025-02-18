package com.example.backend_app.auth.controllers;

import com.example.backend_app.auth.DTOs.AuthenticationRequest;
import com.example.backend_app.auth.DTOs.AuthenticationResponse;
import com.example.backend_app.auth.DTOs.RegisterRequest;
import com.example.backend_app.auth.services.AuthService;
import com.example.backend_app.auth.services.CookieUtil;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import com.example.backend_app.user.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response){
        authService.registerUser(request,response);
        return ResponseEntity.ok(new AuthenticationResponse("Successfully registered!"));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request,HttpServletResponse response){
        authService.authenticate(request,response);
        return ResponseEntity.ok(new AuthenticationResponse("Successfully authenticated!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        authService.logout(response);
        return ResponseEntity.ok(new AuthenticationResponse("Successfully logged out!"));
    }


    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "jwt", required = false) String token){
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse("Not authenticated"));
        }

        return ResponseEntity.ok(userService.getUserFromToken(token));

    }
}
