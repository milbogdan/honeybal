package com.example.backend_app.global.exception;

public class ExceptionUnauthorized extends RuntimeException {
    public ExceptionUnauthorized(String message) {
        super(message);
    }

    public ExceptionUnauthorized(String message, Throwable cause) {
        super(message, cause);
    }
}
