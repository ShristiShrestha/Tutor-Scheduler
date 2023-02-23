package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.model.*;
import com.fours.onlineschedulerapi.repository.RoleRepository;
import com.fours.onlineschedulerapi.repository.UserRepository;
import com.fours.onlineschedulerapi.utils.UserUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

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

            return new UserDto(user);
        }
    }

    public UserDto update(User user) {
        Long id = user.getId();

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new EntityNotFoundException("User with provided id doesn't exist.");
        } else {
            User userToUpdate = userOptional.get();

            this.setFieldsToUpdate(user, userToUpdate);

            userRepository.save(userToUpdate);

            return new UserDto(user);
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

    public List<UserDto> getAll(
            Optional<String> sortBy,
            Optional<String> filterKey,
            Optional<String> filterValue,
            Optional<String> role
    ) {
        List<UserDto> userDto = new ArrayList<>();
        List<User> users = (List<User>) userRepository.findAll();

        if (!users.isEmpty()) {
            //Filter by role; either tutor, student or coordinator
            if (role.isPresent()) {
                String roleValue = role.get();

                users = users.stream()
                        .filter(user -> user.getRoles().stream()
                                .map(Role::getName)
                                .collect(Collectors.toList())
                                .contains(roleValue.toUpperCase()))
                        .collect(Collectors.toList());
            }

            //Convert to dto
            userDto.addAll(
                    users.stream()
                            .map(UserDto::new)
                            .collect(Collectors.toList())
            );

            //Filter based on filter key and value
            if (filterKey.isPresent() && filterValue.isPresent()) {
                String fKey = filterKey.get();
                String fValue = filterValue.get();

                userDto = UserUtils.filter(fKey, fValue, userDto);
            }

            if (sortBy.isPresent())
                UserUtils.sort(sortBy.get(), userDto);
        }

        return userDto;
    }
}
