package com.example.notification_service.notifications.repositories;

import com.example.notification_service.notifications.models.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    public Page<Notification> findAllByUserEmail(Pageable pageable,String email);
}
