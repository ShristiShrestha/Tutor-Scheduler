package com.fours.onlineschedulerapi.dto;

import com.fours.onlineschedulerapi.model.Role;
import com.fours.onlineschedulerapi.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private Boolean isTutor;

    private Set<Role> roles = new HashSet<>();

    private float rating;

    private List<String> expertise = new ArrayList<>();

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.isTutor = user.getIsTutor();
        this.name = user.getName();
        this.roles = user.getRoles();

        if (this.isTutor) {
            this.rating = user.getTutor().getRating();
            this.expertise = user.getTutor().getExpertiseList();
        }
    }
}
