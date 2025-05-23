package com.aitasker.ai_service.exception;

public class AiRequestException extends RuntimeException{

    public AiRequestException(String message) {
        super(message);
    }

    public AiRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
