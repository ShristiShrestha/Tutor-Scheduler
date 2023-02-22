package com.fours.onlineschedulerapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
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

    @Column(columnDefinition = "float default 0.0")
    private float rating;

    @JsonIgnore
    private String expertise;

    @Transient
    private List<String> expertiseList = new ArrayList<>();

    public void setExpertise(String expertise) {
        List<String> expertiseList = new ArrayList<>();
        this.expertise = expertise;

        if (!this.expertise.isEmpty()) {
            expertiseList.addAll(Arrays.asList(expertise.split(",")));
        }

        this.expertiseList.clear();
        this.expertiseList.addAll(expertiseList);
    }

    public void setExpertiseList(List<String> expertiseList) {
        this.expertiseList = expertiseList;
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
