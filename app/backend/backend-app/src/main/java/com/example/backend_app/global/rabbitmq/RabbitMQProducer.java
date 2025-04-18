package com.example.backend_app.global.rabbitmq;

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

    @Value("${rabbitmq.email.routingKey}")
    private String emailRoutingKey;


    private final RabbitTemplate rabbitTemplate;

    //sending the message
    public void send(NotificationDTO message) {
        rabbitTemplate.convertAndSend(exchangeName, routingKey, message);
        System.out.println("Sent message " + message);
    }
    public void sendEmail(EmailDTO message) {
        rabbitTemplate.convertAndSend(exchangeName, emailRoutingKey, message);
        System.out.println("Email sent "+message);
    }
}
