package com.fours.onlineschedulerapi.repository;

import com.fours.onlineschedulerapi.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    List<Message> findBySenderEmail(String email);

    List<Message> findByReceiverEmail(String email);
}
