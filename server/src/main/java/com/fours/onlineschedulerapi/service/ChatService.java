package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.RabbitMqConstant;
import com.fours.onlineschedulerapi.model.Message;
import com.fours.onlineschedulerapi.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Autowired
    private RabbitMqService rabbitMqService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public void send(Message message) {
        messageRepository.save(message);

        // Set message properties
        Map<String, Object> headers = new HashMap<>();
        headers.put(RabbitMqConstant.MESSAGE_ID, message.getId());

        String queueName = RabbitMqConstant.QUEUE_PREFIX + message.getReceiverEmail();

        rabbitMqService.sendMessage(message.getMessage(), queueName, headers);
    }

    public void updateReceivedAt(List<Long> ids) {
        List<Message> messages = (List) messageRepository.findAllById(ids);

        Date receivedAt = Date.from(Instant.now());

        messages.forEach(message -> message.setReceivedAt(receivedAt));

        messageRepository.saveAll(messages);
    }
}
