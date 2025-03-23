package com.example.notification_service.global.rabbitmq;

import com.example.notification_service.global.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQListener {

    @RabbitListener(queues = RabbitMQConfig.queueName)
    public void receiveMessage(String message) {
        System.out.println("📩 Received notification: " + message);
    }

}
