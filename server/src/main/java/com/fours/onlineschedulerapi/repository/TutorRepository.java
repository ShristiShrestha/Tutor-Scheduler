package com.fours.onlineschedulerapi.repository;

import com.fours.onlineschedulerapi.model.Tutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends CrudRepository<Tutor, Long> {

}
