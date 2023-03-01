package com.fours.onlineschedulerapi.exception;

import lombok.Getter;

@Getter
public class NotAuthorizedException extends Exception {
    private String message;

    public NotAuthorizedException(String message) {
        this.message = message;
    }
}
