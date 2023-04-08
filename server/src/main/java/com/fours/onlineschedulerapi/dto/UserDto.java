package com.fours.onlineschedulerapi.dto;

import com.fours.onlineschedulerapi.model.Role;
import com.fours.onlineschedulerapi.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;
import java.util.stream.Collectors;

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

    private Date createdAt;

    private Integer ratedBy;

    private Map<Float,Integer> ratingByNumbers;

    public Boolean hasRoles(List<String> roles){
        List<String> userRolesNames = this.roles.stream().map(Role::getName).collect(Collectors.toList());
        List<String> expectedRolesNotMatched = roles.stream().filter(role -> !userRolesNames.contains(role)).collect(Collectors.toList());
        return expectedRolesNotMatched.size() == 0;
    }

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.isTutor = user.getIsTutor();
        this.name = user.getName();
        this.roles = user.getRoles();
        this.createdAt = user.getCreatedAt();

        if (this.isTutor) {
            this.rating = user.getTutor().getRating();
            this.expertise = user.getTutor().getExpertiseList();
            this.ratedBy = user.getTutor().getRatedBy();
            this.ratingByNumbers = user.getTutor().getRatingByNumbers();
        }
    }
}
