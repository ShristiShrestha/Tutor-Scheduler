package com.fours.onlineschedulerapi.dto;

import com.fours.onlineschedulerapi.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TutorDto extends UserDto {

    private float rating;

    private List<String> expertise = new ArrayList<>();

    public TutorDto(User user, float rating, List<String> expertise) {
        super(user.getName(), user.getEmail(), user.getIsTutor(), user.getRoles());
        this.rating = rating;
        this.expertise = expertise;
    }
}
