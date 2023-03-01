package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.AppointmentConstant;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.exception.BadRequestException;
import com.fours.onlineschedulerapi.model.Appointment;
import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.repository.AppointmentRepository;
import com.fours.onlineschedulerapi.repository.UserRepository;
import com.fours.onlineschedulerapi.utils.DateUtil;
import com.fours.onlineschedulerapi.utils.FilterSortUtil;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private AppointmentRepository appointmentRepository;

    private UserRepository userRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            UserRepository userRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    public Appointment save(Appointment appointment) throws BadRequestException {
        this.validateAppointments(appointment);

        appointmentRepository.save(appointment);

        return appointment;
    }

    private void validateAppointments(Appointment appointment) throws BadRequestException {
        Optional<Appointment> conflictingTutorAppointment = appointmentRepository.findByTutorIdAndScheduledAtAndStatus(
                appointment.getTutorId(), appointment.getScheduledAt(), AppointmentConstant.ACCEPTED
        );

        if (conflictingTutorAppointment.isPresent()) {
            throw new BadRequestException("Tutor has an appointment scheduled at this timeslot.");
        }

        Optional<Appointment> conflictingStudentAppointment = appointmentRepository.findByStudentIdAndScheduledAtAndStatus(
                appointment.getTutorId(), appointment.getScheduledAt(), AppointmentConstant.ACCEPTED
        );

        if (conflictingStudentAppointment.isPresent()) {
            throw new BadRequestException("You already have an appointment scheduled at this timeslot.");
        }
    }

    public List<Appointment> getAll(
            Optional<Long> tutorId,
            Optional<Long> studentId,
            Optional<String> month,
            Optional<String> year,
            Optional<Boolean> upcoming
    ) {

        //Get all appointments from database
        List<Appointment> appointments = appointmentRepository.findAllByOrderByScheduledAtAsc();

        //Filter based on present query parameters to narrow the results
        //Improvement: Use criteria builder to query database and fetch filtered results
        if (upcoming.isPresent() && upcoming.get()) {
            Date now = Date.from(Instant.now());

            appointments = appointments.stream()
                    .filter(appointment -> appointment.getScheduledAt().after(now))
                    .collect(Collectors.toList());
        }

        if (tutorId.isPresent()) {
            Long id = tutorId.get();

            appointments = appointments.stream()
                    .filter(appointment -> appointment.getTutorId().equals(id))
                    .collect(Collectors.toList());
        }

        if (studentId.isPresent()) {
            Long id = studentId.get();

            appointments = appointments.stream()
                    .filter(appointment -> appointment.getStudentId().equals(id))
                    .collect(Collectors.toList());
        }

        if (year.isPresent()) {
            Integer y = Integer.valueOf(year.get());

            appointments = appointments.stream()
                    .filter(appointment -> DateUtil.getYear(appointment.getScheduledAt()).equals(y))
                    .collect(Collectors.toList());

            if (month.isPresent() && !month.get().isEmpty()) {
                Integer m = DateUtil.getMonth(
                       month.get()
                );

                appointments = appointments.stream()
                        .filter(appointment -> {
                            Integer mon = appointment.getScheduledAt().getMonth();

                            return mon.equals(m);
                        })
                        .collect(Collectors.toList());
            }
        }

        //Collect student/tutor ids and fetch user details from database
        Set<Long> userIds = appointments.stream()
                .map(Appointment::getTutorId)
                .collect(Collectors.toSet());

        userIds.addAll(
                appointments.stream()
                        .map(Appointment::getStudentId)
                        .collect(Collectors.toList())
        );

        //Set student/tutor details to appointments
        if (!userIds.isEmpty()) {
            List<User> users = userRepository.findByIdIn(userIds);

            appointments.forEach(appointment -> {
                appointment.setStudent(
                        new UserDto(
                                users.stream()
                                        .filter(user -> user.getId().equals(appointment.getStudentId()))
                                        .collect(Collectors.toList())
                                        .get(0)
                        )
                );

                appointment.setTutor(
                        new UserDto(
                                users.stream()
                                        .filter(user -> user.getId().equals(appointment.getTutorId()))
                                        .collect(Collectors.toList())
                                        .get(0)
                        )
                );
            });
        }

        return appointments;
    }

    public Appointment getById(Long id) throws EntityNotFoundException {
        //Get appointment by id from database or throw exception if it doesn't exist
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment with given id is not present."));

        //Set student/tutor details to the appointment
        appointment.setTutor(
                new UserDto(
                        userRepository.findById(appointment.getTutorId()).get()
                )
        );

        appointment.setStudent(
                new UserDto(
                        userRepository.findById(appointment.getStudentId()).get()
                )
        );

        return appointment;
    }

    public List<Appointment> getByTutorId(
            Long tutorId,
            Optional<String> status,
            Optional<Boolean> upcoming,
            Optional<String> sortBy
    ) {
        List<Appointment> appointments = appointmentRepository.findByTutorId(tutorId);

        if (status.isPresent() && !status.get().isEmpty()) {
            appointments = appointments.stream()
                    .filter(appointment -> appointment.getStatus().equalsIgnoreCase(status.get()))
                    .collect(Collectors.toList());
        }

        if (upcoming.isPresent() && upcoming.get()) {
            Date now = Date.from(Instant.now());

            appointments = appointments.stream()
                    .filter(appointment -> appointment.getScheduledAt().after(now))
                    .collect(Collectors.toList());
        }

        //Collect student ids and fetch user details from database
        Set<Long> studentIds = appointments.stream()
                .map(Appointment::getStudentId)
                .collect(Collectors.toSet());

        //Set student details to appointments
        if (!studentIds.isEmpty()) {
            List<User> users = userRepository.findByIdIn(studentIds);

            appointments.forEach(appointment -> {
                appointment.setStudent(
                        new UserDto(
                                users.stream()
                                        .filter(user -> user.getId().equals(appointment.getStudentId()))
                                        .collect(Collectors.toList())
                                        .get(0)
                        )
                );
            });
        }

        if (sortBy.isPresent() && !sortBy.get().isEmpty()) {
            String sortVal = sortBy.get();

            FilterSortUtil.sortAppointments(sortVal, appointments);
        }

        return appointments;
    }
}
