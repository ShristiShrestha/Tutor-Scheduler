package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.AppointmentConstant;
import com.fours.onlineschedulerapi.constants.Message;
import com.fours.onlineschedulerapi.constants.RoleConstants;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.exception.BadRequestException;
import com.fours.onlineschedulerapi.exception.NotAuthorizedException;
import com.fours.onlineschedulerapi.model.Appointment;
import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.repository.AppointmentRepository;
import com.fours.onlineschedulerapi.repository.UserRepository;
import com.fours.onlineschedulerapi.utils.DateUtil;
import com.fours.onlineschedulerapi.utils.FilterSortUtil;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private AppointmentRepository appointmentRepository;

    private UserRepository userRepository;

    private AuthenticatedUserService authenticatedUserService;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            UserRepository userRepository,
            AuthenticatedUserService authenticatedUserService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    public Appointment save(Appointment appointment) throws BadRequestException {
        this.validateAppointments(
                appointment.getTutorId(),
                appointment.getStudentId(),
                appointment.getScheduledAt()
        );

        appointmentRepository.save(appointment);

        return appointment;
    }

    private void validateAppointments(
            Long tutorId,
            Long studentId,
            Date scheduledAt
    ) throws BadRequestException {

        List<Appointment> conflictingTutorAppointment = appointmentRepository.findByTutorIdAndScheduledAtAndStatus(
                tutorId, scheduledAt, AppointmentConstant.ACCEPTED
        );

        if (!conflictingTutorAppointment.isEmpty())
            throw new BadRequestException(Message.TUTOR_CONFLICTING_TIMESLOT);

        List<Appointment> conflictingStudentAppointment = appointmentRepository.findByStudentIdAndScheduledAtAndStatus(
                studentId, scheduledAt, AppointmentConstant.ACCEPTED
        );

        if (!conflictingStudentAppointment.isEmpty())
            throw new BadRequestException(Message.STUDENT_CONFLICTING_TIMESLOT);

        Boolean doesPendingAppointmentExist = !appointmentRepository
                .findByTutorIdAndStudentIdAndScheduledAtAndStatus(tutorId, studentId, scheduledAt, AppointmentConstant.PENDING)
                .isEmpty();

        if (doesPendingAppointmentExist)
            throw new BadRequestException(Message.TUTOR_STUDENT_PENDING_AT_THIS_TIMESLOT);
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
                .orElseThrow(() -> new EntityNotFoundException(Message.NON_EXISTENT_APPOINTMENT));

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

    @Transactional
    public Appointment update(Appointment appointment) throws BadRequestException, NotAuthorizedException {
        Long appointmentId = appointment.getId();

        //Get appointment to update from database
        Appointment appointmentToUpdate = appointmentRepository
                .findById(appointmentId)
                .orElseThrow(() -> new BadRequestException(Message.NON_EXISTENT_APPOINTMENT));

        //Get updated status and status message from the request
        String status = appointment.getStatus();
        String statusMessage = appointment.getStatusMessage();

        //Get updated time slot from the request
        Date scheduledAt = appointment.getScheduledAt();

        //When tutor updates the status of the appointment.
        if (Objects.nonNull(status) && !status.isEmpty() && !status.equalsIgnoreCase(AppointmentConstant.PENDING)) {

            //Check if the status message has been provided in case of rejected appointment.
            if (status.equalsIgnoreCase(AppointmentConstant.REJECTED)
                    && (Objects.isNull(statusMessage) || statusMessage.isEmpty())) {
                throw new BadRequestException("Please provide a rejection message.");
            }

            appointmentToUpdate.setStatus(status.toUpperCase());
            appointmentToUpdate.setStatusMessage(statusMessage);

            appointmentRepository.save(appointmentToUpdate);

            //Reject all the pending appointments at the accepted timeslot for both tutor and student.
            this.rejectPendingAppointmentsAtCurrentlyAcceptedTimeSlot(appointmentToUpdate);

        } //When co-ordinator re-schedules the appointment
        else if (Objects.nonNull(scheduledAt)) {

            if (!authenticatedUserService.getAuthorities().contains(RoleConstants.COORDINATOR))
                throw new NotAuthorizedException(Message.UNAUTHORIZED);

            this.validateAppointments(
                    appointmentToUpdate.getTutorId(),
                    appointmentToUpdate.getStudentId(),
                    scheduledAt
            );

            appointmentToUpdate.setScheduledAt(scheduledAt);
            appointmentToUpdate.setStatus(AppointmentConstant.PENDING);
            appointmentToUpdate.setStatusMessage(null);
            appointmentToUpdate.setClientReceivedAt(null);

            appointmentRepository.save(appointmentToUpdate);

        }

        return appointmentToUpdate;
    }

    private void rejectPendingAppointmentsAtCurrentlyAcceptedTimeSlot(Appointment appointment) {
        if (appointment.getStatus().equalsIgnoreCase(AppointmentConstant.ACCEPTED)) {
            Long appointmentId = appointment.getId();
            Long tutorId = appointment.getTutorId();
            Long studentId = appointment.getStudentId();

            Date scheduledAt = appointment.getScheduledAt();

            List<Appointment> tutorAppointmentsToReject = appointmentRepository
                    .findByTutorIdAndScheduledAtAndStatus(tutorId, scheduledAt, AppointmentConstant.PENDING)
                    .stream()
                    .filter(ap -> !ap.getId().equals(appointmentId))
                    .collect(Collectors.toList());

            List<Appointment> studentAppointmentsToReject = appointmentRepository
                    .findByStudentIdAndScheduledAtAndStatus(studentId, scheduledAt, AppointmentConstant.PENDING)
                    .stream()
                    .filter(ap -> !ap.getId().equals(appointmentId))
                    .collect(Collectors.toList());

            tutorAppointmentsToReject.forEach(ap -> {
                ap.setStatus(AppointmentConstant.REJECTED);
                ap.setStatusMessage(Message.SYSTEM_CANCELED_APPOINTMENT);
            });

            studentAppointmentsToReject.forEach(ap -> {
                ap.setStatus(AppointmentConstant.REJECTED);
                ap.setStatusMessage(Message.SYSTEM_CANCELED_APPOINTMENT);
            });

            if (!tutorAppointmentsToReject.isEmpty())
                appointmentRepository.saveAll(tutorAppointmentsToReject);

            if (!studentAppointmentsToReject.isEmpty())
                appointmentRepository.saveAll(studentAppointmentsToReject);
        }
    }

    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }

    public void updateClientReceivedAt(List<Long> ids) {
        List<Appointment> appointments = (List) appointmentRepository.findAllById(ids);
        Date receivedAt = Date.from(Instant.now());

        appointments.forEach(appointment -> appointment.setClientReceivedAt(receivedAt));

        appointmentRepository.saveAll(appointments);
    }
}
