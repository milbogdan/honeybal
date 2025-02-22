package com.example.backend_app.global.exception;

public class ExceptionNotFound extends RuntimeException {
    public ExceptionNotFound(String message) {
        super(message);
    }

    public ExceptionNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
