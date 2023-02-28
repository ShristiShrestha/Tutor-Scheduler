package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.exception.ConflictingAppointmentException;
import com.fours.onlineschedulerapi.model.Appointment;
import com.fours.onlineschedulerapi.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody Appointment appointment) {
        try {
            Appointment savedAppointment = appointmentService.save(appointment);

            return new ResponseEntity<>(
                    savedAppointment, HttpStatus.CREATED
            );
        } catch (ConflictingAppointmentException e) {

            return new ResponseEntity<>(
                    e.getMessage(), HttpStatus.BAD_REQUEST
            );
        }
    }

}
