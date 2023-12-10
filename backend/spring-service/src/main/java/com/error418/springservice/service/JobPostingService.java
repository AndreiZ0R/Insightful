package com.error418.springservice.service;

import com.error418.springservice.model.JobPosting;
import com.error418.springservice.repository.JobPostingRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobPostingService {

    private final JobPostingRepository jobPostingRepository;

    public JobPostingService(JobPostingRepository jobPostingRepository) {
        this.jobPostingRepository = jobPostingRepository;
    }

    public List<JobPosting> getAllJobPostings() {
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        return jobPostingRepository.findAll();
//                .stream()
//                .filter(jobPosting -> jobPosting.getApplicationDeadline().after(currentTimestamp))
//                .collect(Collectors.toList());
    }

    public JobPosting saveJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting updateJobPosting(Long id, JobPosting jobPosting) {
        if (jobPostingRepository.existsById(id)) {
            jobPosting.setJobPostingId(id);
            return jobPostingRepository.save(jobPosting);
        }
        // handle the case where the job posting does not exist
        return null;
    }

    public void deleteJobPosting(Long id) {
        jobPostingRepository.deleteById(id);
    }

    public List<JobPosting> searchJobPostings(String query) {
        return jobPostingRepository.findAll().stream()
                .filter(jobPosting -> jobPosting.getAcceptedDisability() != null && !jobPosting.getAcceptedDisability().isEmpty())
                .collect(Collectors.toList());
    }

}