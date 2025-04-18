package com.example.notification_service.global.rabbitmq;

import com.example.notification_service.notifications.DTOs.EmailDTO;
import com.example.notification_service.notifications.DTOs.NotificationDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.concurrent.CountDownLatch;

@Component
public class RabbitMQConsumer {

    //listener
    @RabbitListener(queues={"${rabbitmq.queue.name}"})
    public void consume(NotificationDTO message) {
        System.out.println(message);
    }
    //listener for email
    @RabbitListener(queues={"${rabbitmq.emailQueue.name}"})
    public void consumeEmailQueue(EmailDTO message) {
        System.out.println(message);
    }
}
