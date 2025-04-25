package com.example.backend_app.global.rabbitmq;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmailDTO {
    private String receiver;
    private String subject;
    private String body;
}
