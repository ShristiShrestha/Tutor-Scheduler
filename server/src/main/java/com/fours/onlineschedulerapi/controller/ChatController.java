package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.constants.ResponseMessage;
import com.fours.onlineschedulerapi.model.Message;
import com.fours.onlineschedulerapi.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping()
    public ResponseEntity<?> send(@RequestBody @Valid Message message) {
        List<Message> messages = chatService.send(message);

        return new ResponseEntity<>(
          messages,
          HttpStatus.OK
        );
    }

    @PutMapping(value = "/received")
    public ResponseEntity<?> updateReceivedAt(@RequestBody Map<String, List<Long>> ids) {
        List<Message> messages = chatService.updateReceivedAt(ids.get("id"));

        return new ResponseEntity<> (
                messages,
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<?> get() {

        return new ResponseEntity<> (
                chatService.getMessages(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getConversationWith(@PathVariable String email) {

        return new ResponseEntity<>(
                chatService.getConversationWith(email),
                HttpStatus.OK
        );
    }
}
