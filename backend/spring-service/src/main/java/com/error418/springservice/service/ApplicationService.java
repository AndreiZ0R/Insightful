package com.error418.springservice.service;
import com.error418.springservice.model.Application;
import com.error418.springservice.repository.ApplicationRepository;
import org.hibernate.engine.jdbc.BlobProxy;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application saveApplication(Long jobId, Long applicantUserId, MultipartFile cvFile, MultipartFile coverLetterFile, String status) throws Exception {
        Application application = new Application();
        application.setJobId(jobId);
        application.setApplicantUserId(applicantUserId);
        application.setSubmissionDate(new Timestamp(System.currentTimeMillis()));
        application.setStatus(status);
        application.setCv(convertToBlob(cvFile));
        application.setCoverLetter(convertToBlob(coverLetterFile));

        return applicationRepository.save(application);
    }

    public Application updateApplication(Long applicationId, MultipartFile cvFile, MultipartFile coverLetterFile, String status) throws Exception {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new Exception("Application not found"));
        if (cvFile != null) {
            application.setCv(convertToBlob(cvFile));
        }
        if (coverLetterFile != null) {
            application.setCoverLetter(convertToBlob(coverLetterFile));
        }
        application.setStatus(status);

        return applicationRepository.save(application);
    }

    private Blob convertToBlob(MultipartFile file) throws Exception {
        if (file != null && !file.isEmpty()) {
            InputStream inputStream = file.getInputStream();
            return BlobProxy.generateProxy(inputStream, file.getSize());
        }
        return null;
    }

    public List<Application> getApplicationsByUserId(Long applicantUserId) {
        return applicationRepository.findByApplicantUserId(applicantUserId);
    }
    public Application getApplicationById(Long applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    public void deleteApplication(Long applicationId) {
        applicationRepository.deleteById(applicationId);
    }
}
