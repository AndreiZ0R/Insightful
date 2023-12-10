package com.error418.springservice.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceDto {
    private Timestamp startDate;
    private Timestamp endDate;
    private String company;
    private String position;
    private List<SkillDto> skills;
}
