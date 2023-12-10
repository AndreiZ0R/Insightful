package com.error418.springservice.controller;

import com.error418.springservice.model.JobPosting;
import com.error418.springservice.service.JobPostingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class JobPostingController {
    private final JobPostingService jobPostingService;
    public JobPostingController(JobPostingService jobPostingService) {
        this.jobPostingService = jobPostingService;
    }

    @GetMapping("/allJobs")
    public ResponseEntity<List<JobPosting>> getAllJobsOffers(){
        List<JobPosting> jobPostings = jobPostingService.getAllJobPostings();
        return ResponseEntity.ok(jobPostings);
    }

    @PostMapping("/job")
    public ResponseEntity<JobPosting> saveJobPosting(@RequestBody JobPosting jobPosting) {
        JobPosting savedJobPosting = jobPostingService.saveJobPosting(jobPosting);
        return ResponseEntity.ok(savedJobPosting);
    }

    @PutMapping("/job/{id}")
    public ResponseEntity<JobPosting> updateJobPosting(@PathVariable Long id, @RequestBody JobPosting jobPosting) {
        JobPosting updatedJobPosting = jobPostingService.updateJobPosting(id, jobPosting);
        if (updatedJobPosting != null) {
            return ResponseEntity.ok(updatedJobPosting);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/job/{id}")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.ok().build();
    }
}