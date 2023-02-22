package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.dto.TutorDto;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.model.*;
import com.fours.onlineschedulerapi.repository.RoleRepository;
import com.fours.onlineschedulerapi.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class UserService {

    private final String TUTOR = "TUTOR";
    private final String STUDENT = "STUDENT";

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            RoleRepository roleRepository
    ) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    public UserDto save(User user) throws EntityExistsException {

        Optional<User> savedUser = userRepository.findByEmail(user.getEmail());

        if (savedUser.isPresent()) {
            throw new EntityExistsException("User with provided email already exists.");
        } else {
            Boolean isTutor = user.getIsTutor();

            user.setIsEnabled(true);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            String roleString = isTutor ? TUTOR : STUDENT;

            if (isTutor) {
                user.getTutor().setUser(user);
            }

            Optional<Role> role = roleRepository.findByName(roleString);

            if (!role.isPresent()) {
                Role newRole = Role.builder()
                        .name(roleString)
                        .build();

                roleRepository.save(newRole);

                role = Optional.of(newRole);
            }

            Set<Role> roles = new HashSet<>();
            roles.add(role.get());

            user.setRoles(roles);

            userRepository.save(user);

            if (isTutor) {

                return new TutorDto(
                        user,
                        user.getTutor().getRating(),
                        user.getTutor().getExpertiseList()
                );
            } else {

                return new UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getIsTutor(),
                        user.getRoles()
                );
            }
        }
    }

    public UserDto update(User user) {
        Long id = user.getId();

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new EntityNotFoundException("User with provided id doesn't exist.");
        } else {
            User userToUpdate = userOptional.get();
            Boolean isTutor = userToUpdate.getIsTutor();

            this.setFieldsToUpdate(user, userToUpdate);

            userRepository.save(userToUpdate);

            if (isTutor) {

                return new TutorDto(
                        userToUpdate,
                        userToUpdate.getTutor().getRating(),
                        userToUpdate.getTutor().getExpertiseList()
                );
            } else {

                return new UserDto(
                        userToUpdate.getId(),
                        userToUpdate.getName(),
                        userToUpdate.getEmail(),
                        userToUpdate.getIsTutor(),
                        userToUpdate.getRoles()
                );
            }
        }
    }

    private void setFieldsToUpdate(User user, User userToUpdate) {
        String name = user.getName();

        if (Objects.nonNull(name) && !name.trim().isEmpty()) {
            userToUpdate.setName(name);
        }

        if (userToUpdate.getIsTutor()) {
            List<String> expertise = user.getTutor().getExpertiseList();

            if (Objects.nonNull(expertise)) {
                userToUpdate.getTutor().setExpertiseList(expertise);
            }
        }
    }

    public void delete(long id) {
        userRepository.updateIsEnabled(id, false);
    }
}
