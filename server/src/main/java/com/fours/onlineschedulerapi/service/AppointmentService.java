package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.AppointmentConstant;
import com.fours.onlineschedulerapi.exception.ConflictingAppointmentException;
import com.fours.onlineschedulerapi.model.Appointment;
import com.fours.onlineschedulerapi.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppointmentService {

    private AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment save(Appointment appointment) throws ConflictingAppointmentException {
        this.validateAppointments(appointment);

        appointmentRepository.save(appointment);

        return appointment;
    }

    private void validateAppointments(Appointment appointment) throws ConflictingAppointmentException {
        Optional<Appointment> conflictingTutorAppointment = appointmentRepository.findByTutorIdAndScheduledAtAndStatus(
                appointment.getTutorId(), appointment.getScheduledAt(), AppointmentConstant.ACCEPTED
        );

        if (conflictingTutorAppointment.isPresent()) {
            throw new ConflictingAppointmentException("Tutor has an appointment scheduled at this timeslot.");
        }

        Optional<Appointment> conflictingStudentAppointment = appointmentRepository.findByStudentIdAndScheduledAtAndStatus(
                appointment.getTutorId(), appointment.getScheduledAt(), AppointmentConstant.ACCEPTED
        );

        if (conflictingStudentAppointment.isPresent()) {
            throw new ConflictingAppointmentException("You already have an appointment scheduled at this timeslot.");
        }
    }
}
