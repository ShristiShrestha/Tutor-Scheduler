package com.fours.onlineschedulerapi.exception;

import lombok.Getter;

@Getter
public class ConflictingAppointmentException extends Exception {
    private String message;

    public ConflictingAppointmentException(String message) {
        this.message = message;
    }
}
