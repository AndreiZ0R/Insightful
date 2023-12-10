package com.error418.springservice.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudyDto {
    private Timestamp startDate;
    private Timestamp endDate;
    private String degree;
    private String studyLocation;
}
