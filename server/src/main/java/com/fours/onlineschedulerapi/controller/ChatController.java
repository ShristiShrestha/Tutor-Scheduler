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
        chatService.send(message);

        return ResponseEntity
                .ok(ResponseMessage.CHAT_MESSAGE_SENT_TO + message.getReceiverEmail());
    }

    @PutMapping(value = "/received")
    public ResponseEntity<?> updateReceivedAt(@RequestBody Map<String, List<Long>> ids) {
        chatService.updateReceivedAt(ids.get("id"));

        return new ResponseEntity<> (
                ResponseMessage.MESSAGES_RECEIVED_AT_CLIENT,
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
}
