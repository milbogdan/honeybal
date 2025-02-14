package com.example.backend_app.exception;

public class ExceptionBadRequest extends RuntimeException {

    public ExceptionBadRequest(String message) {
        super(message);
    }

    public ExceptionBadRequest(String message, Throwable cause) {
        super(message, cause);
    }
}
