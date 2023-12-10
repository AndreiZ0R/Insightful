package com.error418.springservice.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String currentTitle;
    private String currentWorkplace;
    private List<StudyDto> studies;
    private List<ExperienceDto> experiences;
}
