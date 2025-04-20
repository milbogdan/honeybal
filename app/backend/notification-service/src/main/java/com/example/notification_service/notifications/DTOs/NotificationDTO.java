package com.example.notification_service.notifications.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class NotificationDTO {
    private String userEmail;
    private String title;
    private String body;
    private Date createdAt;
}
