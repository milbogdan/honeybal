package com.example.backend_app.user.DTOs;

import com.example.backend_app.user.models.Role;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private String address;

    private Role role;

    private Date createdAt;

    private Date updatedAt;

    private Boolean isVerified;

    private Boolean allowEmailNotifications = true;

    private Boolean allowPushNotifications = true;

}
