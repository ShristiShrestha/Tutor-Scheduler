package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.RabbitMqConstant;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.model.Message;
import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.repository.MessageRepository;
import com.fours.onlineschedulerapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private RabbitMqService rabbitMqService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserRepository userRepository;

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

    public Map<String, List<Message>> getMessages() {
        String loggedInUser = authenticatedUserService.getUsername();

        Map<String, List<Message>> messageMap = new HashMap<>();
        Map<String, List<Message>> userMessagesMap = new HashMap<>();

        //Find all the messages currently logged user is involved in
        List<Message> receivedMessages = messageRepository.findByReceiverEmail(loggedInUser);
        List<Message> sentMessages = messageRepository.findBySenderEmail(loggedInUser);

        //Group the messages by the other user involved in the conversation with currently logged user
        if (!receivedMessages.isEmpty() || !sentMessages.isEmpty()) {
            Set<String> email = new HashSet<>();

            receivedMessages.forEach(msg -> {
                String senderEmail = msg.getSenderEmail();
                email.add(senderEmail);

                if (messageMap.containsKey(senderEmail)) {
                    messageMap.get(senderEmail).add(msg);
                } else {
                    List<Message> messages = new ArrayList<>();
                    messages.add(msg);

                    messageMap.put(senderEmail, messages);
                }
            });

            sentMessages.forEach(msg -> {
                String receiverEmail = msg.getReceiverEmail();
                email.add(receiverEmail);

                if (messageMap.containsKey(receiverEmail)) {
                    messageMap.get(receiverEmail).add(msg);
                } else {
                    List<Message> messages = new ArrayList<>();
                    messages.add(msg);

                    messageMap.put(receiverEmail, messages);
                }
            });

            List<User> users = userRepository.findByEmailIn(email);

            List<UserDto> userDtos = users.stream().map(UserDto::new).collect(Collectors.toList());

            messageMap.forEach((s, messages) -> {
                messages.sort(Comparator.comparing(Message::getSentAt));

                userMessagesMap.put(
                        s + "," +
                        userDtos.stream().filter(userDto -> userDto.getEmail().equals(s)).findFirst().get().getName(),
                        messages
                );
            });

        }

        return userMessagesMap;
    }
}
