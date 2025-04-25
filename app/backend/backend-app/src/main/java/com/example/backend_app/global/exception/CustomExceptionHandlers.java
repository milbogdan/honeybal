package com.example.backend_app.global.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;

@Configuration
public class CustomExceptionHandlers {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Bean
    public AccessDeniedHandler customAccessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            buildJsonResponse(response, 403, "Forbidden");
        };
    }

    @Bean
    public AuthenticationEntryPoint customAuthenticationEntryPoint() {
        return (request, response, accessDeniedException) -> {
            buildJsonResponse(response, 401, "Unauthorized");
        };
    }

    private void buildJsonResponse(HttpServletResponse response, int status, String message) throws IOException, IOException {
        response.setStatus(status);
        response.setContentType("application/json");

        Map<String, Object> body = Map.of(
                "message", message,
                "status", status,
                "timestamp", ZonedDateTime.now(ZoneId.of("Z")).toString()
        );

        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
