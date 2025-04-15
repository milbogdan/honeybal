package com.example.notification_service.global.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.concurrent.CountDownLatch;

@Component
public class RabbitMQConsumer {

    //listener
    @RabbitListener(queues={"${rabbitmq.queue.name}"})
    public void consume(String message) {
        System.out.println(message);
    }
}
