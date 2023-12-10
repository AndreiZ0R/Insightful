package com.error418.springservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experienceId;
    private Long experienceUserId;
    private Timestamp startDate;
    private Timestamp endDate;
    private String company;
    private String position;
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name="userSkillId")
    private List<Skill> skills;
}