package com.example.notification_service.notifications.controllers;

import com.example.notification_service.notifications.DTOs.NotificationDTO;
import com.example.notification_service.notifications.models.Notification;
import com.example.notification_service.notifications.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/getAllForUser")
    public ResponseEntity<Page<NotificationDTO>> getForUser(@RequestParam int page, @RequestParam int pageSize, @RequestParam String userEmail) {
        return ResponseEntity.ok(notificationService.getAllForUser(page,pageSize,userEmail));
    }
}
