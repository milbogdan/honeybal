package com.example.notification_service.notifications.mappers;

import com.example.notification_service.notifications.DTOs.NotificationDTO;
import com.example.notification_service.notifications.models.Notification;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface NotificationMapper {
    NotificationDTO notificationToNotificationDTO(Notification notificationDTO);
    List<NotificationDTO> notificationsToNotificationDTOs(List<Notification> notifications);
}
