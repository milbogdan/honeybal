package com.example.notification_service.notifications.services;

import com.example.notification_service.notifications.DTOs.NotificationDTO;
import com.example.notification_service.notifications.mappers.NotificationMapper;
import com.example.notification_service.notifications.models.Notification;
import com.example.notification_service.notifications.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public Page<NotificationDTO> getAllForUser(int page, int pageSize, String userEmail) {
        Pageable pageable = PageRequest.of(page,pageSize);
        Page<Notification> nots = notificationRepository.findAllByUserEmail(pageable,userEmail);
        List<NotificationDTO> notDtos = notificationMapper.notificationsToNotificationDTOs(nots.getContent());
        return new PageImpl<>(notDtos, pageable, nots.getTotalElements());

    }
}
