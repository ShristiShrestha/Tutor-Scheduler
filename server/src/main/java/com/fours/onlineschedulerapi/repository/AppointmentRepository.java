package com.fours.onlineschedulerapi.repository;

import com.fours.onlineschedulerapi.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    List<Appointment> findByTutorIdAndScheduledAtAndStatus(Long tutorId, Date scheduledAt, String status);

    List<Appointment> findByStudentIdAndScheduledAtAndStatus(Long studentId, Date scheduledAt, String status);

    List<Appointment> findAllByOrderByScheduledAtAsc();

    List<Appointment> findByTutorId(Long tutorId);

    List<Appointment> findByTutorIdAndStudentIdAndScheduledAtAndStatus(
            Long tutorId, Long studentId, Date scheduledAt, String status
    );
}
