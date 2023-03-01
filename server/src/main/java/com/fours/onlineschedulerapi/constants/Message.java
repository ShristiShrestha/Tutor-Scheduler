package com.fours.onlineschedulerapi.constants;

public class Message {

    public static final String UNAUTHORIZED = "You don't have sufficient privilege to complete this request.";
    public static final String SYSTEM_CANCELED_APPOINTMENT = "This appointment was automatically canceled because " +
            "it conflicted with other appointments at the same time slot.";
    public static final String NON_EXISTENT_APPOINTMENT = "Appointment with the provided id doesn't exist.";

    public static final String NON_EXISTENT_USER = "User with the provided id doesn't exist.";
    public static final String APPOINTMENT_DELETED = "Appointment has been deleted successfully.";
    public static final String USER_DELETED = "User has been deleted successfully.";
}
