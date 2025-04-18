package com.example.notification_service.notifications.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class NotificationDTO {
    private String receiver;
    private String subject;
    private String body;
}
