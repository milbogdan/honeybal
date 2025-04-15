package com.example.backend_app.global.config.rabbitmq;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rabbit")
@RequiredArgsConstructor
public class RabbitMQMessageSender {
    private final RabbitMQProducer producer;

    //this controller is only for testing purposes!!
    @GetMapping("/publish")
    public ResponseEntity<String> sendMessage(@RequestParam("message")String message) {
        producer.send(message);
        return ResponseEntity.ok(message);
    }
}
