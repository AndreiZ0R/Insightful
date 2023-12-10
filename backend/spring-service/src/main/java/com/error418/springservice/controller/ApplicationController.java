package com.error418.springservice.controller;

import com.error418.springservice.model.Application;
import com.error418.springservice.service.ApplicationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/")
    public ResponseEntity<Application> createApplication(
            @RequestParam("jobId") Long jobId,
            @RequestParam("applicantUserId") Long applicantUserId,
            @RequestParam("cvFile") MultipartFile cvFile,
            @RequestParam("coverLetterFile") MultipartFile coverLetterFile,
            @RequestParam("status") String status) throws Exception {
        Application application = applicationService.saveApplication(jobId, applicantUserId, cvFile, coverLetterFile, status);
        return ResponseEntity.ok(application);
    }

    @PutMapping("/{applicationId}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long applicationId,
            @RequestParam("cvFile") MultipartFile cvFile,
            @RequestParam("coverLetterFile") MultipartFile coverLetterFile,
            @RequestParam("status") String status) throws Exception {
        Application application = applicationService.updateApplication(applicationId, cvFile, coverLetterFile, status);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable Long userId) {
        List<Application> applications = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long applicationId) {
        Application application = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(application);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return ResponseEntity.ok().build();
    }
}
