package com.example.backend_app.global.rabbitmq;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rabbit")
@RequiredArgsConstructor
public class RabbitMQMessageSender {
    private final RabbitMQProducer producer;

    //this controller is only for testing purposes!!
    @PostMapping("/publish")
    public ResponseEntity<NotificationDTO> sendMessage(@RequestBody NotificationDTO message) {
        producer.send(message);
        return ResponseEntity.ok(message);
    }
    @PostMapping("/publishEmail")
    public ResponseEntity<EmailDTO> sendMessage(@RequestBody EmailDTO message) {
        producer.sendEmail(message);
        return ResponseEntity.ok(message);
    }
}
