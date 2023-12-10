package com.error418.springservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"user\"")
@Entity
public class User {
    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @NonNull
    private String name;
    @NonNull
    private String password;
    @NonNull
    @Column(unique=true)
    private String email;
    @NonNull
    private String userType;
    private boolean partialBlindness;
    private boolean fullBlindness;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile;
    @NonNull
    private String phoneNumber;
    @NonNull
    private Timestamp birthDate;
}