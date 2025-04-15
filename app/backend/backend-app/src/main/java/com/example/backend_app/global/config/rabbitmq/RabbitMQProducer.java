package com.example.backend_app.global.config.rabbitmq;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class RabbitMQProducer {

    @Value("${rabbitmq.exchangeName}")
    private String exchangeName;

    @Value("${rabbitmq.routingKey}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    //sending the message
    public void send(String message) {
        rabbitTemplate.convertAndSend(exchangeName, routingKey, message);
        System.out.println("Sent message " + message);
    }
}
