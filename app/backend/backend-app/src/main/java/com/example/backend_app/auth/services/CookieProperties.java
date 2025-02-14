package com.example.backend_app.auth.services;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "httponly.cookie")
public class CookieProperties {
    private int expiration;
}
