package com.error418.springservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    private String currentTitle;
    private String currentWorkplace;
    @OneToMany (cascade = CascadeType.ALL)
    @JoinColumn(name="studyUserId")
    private List<Study> studies;
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name="experienceUserId")
    private List<Experience> experiences;
}