package com.error418.springservice.controller;


import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private String name;
    private String password;
    private String email;
    private String userType;
    private boolean partialBlindness;
    private boolean fullBlindness;
    private String phoneNumber;
    private Timestamp birthDate;
    private ProfileDto profile;
}

