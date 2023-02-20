package com.fours.onlineschedulerapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tutors")
@Getter
@Setter
public class Tutor {

    @Id
    @Column(name = "user_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    @LazyCollection(LazyCollectionOption.TRUE)
    private User user;

    private float rating;

    @JsonIgnore
    private String expertise;

    @Transient
    private List<String> expertiseList = new ArrayList<>();

    public List<String> getExpertiseList() {
        List<String> expertiseList = new ArrayList<>();

        if (!this.expertise.isEmpty()) {
            expertiseList.addAll(Arrays.asList(expertise.split(",")));
        }

        this.expertiseList.addAll(expertiseList);
        return this.expertiseList;
    }

    public void setExpertise() {
        StringBuilder expertise = new StringBuilder();

        if (Objects.nonNull(this.expertiseList) && !this.expertiseList.isEmpty()) {
            for (int i = 0; i < expertiseList.size(); i++) {
                expertise.append(expertiseList.get(i));

                if (i != expertiseList.size() - 1) {
                    expertise.append(",");
                }
            }
        }

        this.expertise = expertise.toString();
    }
}
