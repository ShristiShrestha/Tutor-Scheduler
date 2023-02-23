package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.service.AuthenticatedUserService;
import com.fours.onlineschedulerapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.util.Optional;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @PostMapping(value = "/signup")
    public ResponseEntity<?> save(@RequestBody User user) throws EntityExistsException {
        UserDto savedUser = userService.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws EntityExistsException {
        if (authenticatedUserService.getAuthorities().contains("COORDINATOR")) {
            userService.delete(id);

            return ResponseEntity.ok("User deleted successfully.");
        } else {

            return new ResponseEntity<>(
                    "You don't have sufficient privilege to complete this request.",
                    HttpStatus.FORBIDDEN
            );
        }
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody User user) throws EntityExistsException {
        UserDto updatedUser = userService.update(user);

        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam("sortBy") Optional<String> sortBy,
            @RequestParam("filterKey") Optional<String> filterKey,
            @RequestParam("filterValue") Optional<String> filterValue,
            @RequestParam("role") Optional<String> role
    ) {
        return ResponseEntity.ok(userService.getAll(sortBy, filterKey, filterValue, role));
    }
}
