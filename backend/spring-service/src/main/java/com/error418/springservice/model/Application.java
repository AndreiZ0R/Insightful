package com.error418.springservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.sql.Timestamp;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private Long jobId;

    private Long applicantUserId;

    @Column
    private Timestamp submissionDate;

    @Column
    private String status; // Consider using an Enum for predefined statuses

    @Lob
    private Blob cv; // Storing the CV as a binary large object

    @Lob
    private Blob coverLetter; // Storing the cover letter as a binary large object

    // Constructors, getters, and setters
}
