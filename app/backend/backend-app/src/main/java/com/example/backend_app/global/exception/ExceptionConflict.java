package com.example.backend_app.global.exception;

public class ExceptionConflict extends RuntimeException {
    public ExceptionConflict(String message) {
        super(message);
    }

    public ExceptionConflict(String message, Throwable cause) {
        super(message, cause);
    }
}
