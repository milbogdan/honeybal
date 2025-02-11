package com.example.backend_app.user.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name="bearerAuth")
public class UserController {

    @GetMapping("/public/get")
    public String get() {
        return "Hello World";
    }
}
