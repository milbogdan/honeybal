package com.example.backend_app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${frontend.urls}")
    private String frontendUrls;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontendUrls)
                .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
