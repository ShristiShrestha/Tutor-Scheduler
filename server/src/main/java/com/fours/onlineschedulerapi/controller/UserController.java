package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/signup")
    public ResponseEntity<?> save(@RequestBody User user) throws EntityExistsException {
        UserDto savedUser = userService.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws EntityExistsException {
        userService.delete(id);

        return ResponseEntity.ok("User deleted successfully.");
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody User user) throws EntityExistsException {
        UserDto updatedUser = userService.update(user);

        return ResponseEntity.ok(updatedUser);
    }
}
