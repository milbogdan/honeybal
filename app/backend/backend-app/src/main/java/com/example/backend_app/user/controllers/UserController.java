package com.example.backend_app.user.controllers;

import com.example.backend_app.user.DTOs.EditUserDTO;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/api/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserDTO>> getAll(@RequestParam int page, @RequestParam int pageSize,
                                                @RequestParam(required = false) String search,@RequestParam(required = false) Boolean isVerified ) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAll(page,pageSize,search,isVerified));
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getById(@PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getById(id));
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<UserDTO> put(@PathVariable long id, @RequestBody EditUserDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.editUser(user,id));
    }
}
