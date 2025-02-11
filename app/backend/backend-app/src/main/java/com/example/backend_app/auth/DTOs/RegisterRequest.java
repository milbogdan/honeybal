package com.example.backend_app.auth.DTOs;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String lastName;
    private String email;
    private String password;
    private String username;
}
