package com.petcare.exception;

public class AlreadyFeedException extends RuntimeException {
    public AlreadyFeedException(String message) {
        super(message);
    }
}
