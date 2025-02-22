package com.example.backend_app.user.DTOs;

import com.example.backend_app.user.models.Role;
import lombok.Data;

import java.util.Date;

@Data
public class EditUserDTO {
    private String username;

    private String firstName;

    private String lastName;

    private String address;
}
