package com.fours.onlineschedulerapi.repository;

import com.fours.onlineschedulerapi.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
}
