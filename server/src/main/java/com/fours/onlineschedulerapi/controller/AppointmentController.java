package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.constants.Message;
import com.fours.onlineschedulerapi.constants.RoleConstants;
import com.fours.onlineschedulerapi.exception.BadRequestException;
import com.fours.onlineschedulerapi.exception.NotAuthorizedException;
import com.fours.onlineschedulerapi.model.Appointment;
import com.fours.onlineschedulerapi.service.AppointmentService;
import com.fours.onlineschedulerapi.service.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody Appointment appointment) {
        try {
            Appointment savedAppointment = appointmentService.save(appointment);

            return new ResponseEntity<>(
                    savedAppointment, HttpStatus.CREATED
            );
        } catch (BadRequestException e) {

            return new ResponseEntity<>(
                    e.getMessage(), HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam("tutorId") Optional<Long> tutorId,
            @RequestParam("studentId") Optional<Long> studentId,
            @RequestParam("month") Optional<String> month,
            @RequestParam("year") Optional<String> year,
            @RequestParam("upcoming") Optional<Boolean> upcoming
    ) {
        List<Appointment> appointments = appointmentService.getAll(tutorId, studentId, month, year, upcoming);

        return ResponseEntity.ok(appointments);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {

            return ResponseEntity.ok(appointmentService.getById(id));
        } catch (EntityNotFoundException e) {

            return new ResponseEntity<>(
                    e.getMessage(), HttpStatus.BAD_REQUEST
            );
        }
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Appointment appointment) {
        try {

            return ResponseEntity.ok(appointmentService.update(appointment));
        } catch (BadRequestException e) {

            return new ResponseEntity<>(
                    e.getMessage(), HttpStatus.BAD_REQUEST
            );
        } catch (NotAuthorizedException e) {

            return new ResponseEntity<>(
                    e.getMessage(), HttpStatus.FORBIDDEN
            );
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (authenticatedUserService.getAuthorities().contains(RoleConstants.COORDINATOR)) {
            appointmentService.delete(id);

            return new ResponseEntity<>(
                    Message.APPOINTMENT_DELETED
                    , HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(
                    Message.UNAUTHORIZED, HttpStatus.FORBIDDEN
            );
        }
    }

    @PutMapping(value = "/received")
    public ResponseEntity<?> updateReceivedAt(@RequestBody Map<String, List<Long>> ids) {
        appointmentService.updateClientReceivedAt(ids.get("id"));

        return new ResponseEntity<>(
                Message.APPOINTMENT_RECEIVED_AT_CLIENT,
                HttpStatus.OK
        );
    }

}
