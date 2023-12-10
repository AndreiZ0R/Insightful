package com.error418.springservice.controller;

import com.error418.springservice.model.User;
import com.error418.springservice.service.PdfService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.InputStreamResource;
import java.io.ByteArrayInputStream;
// import other necessary classes

@RestController
@RequestMapping("/api/user/cv")
@CrossOrigin
public class CvController {

    private final PdfService pdfService;

    public CvController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping("/generate/{id}")
    public ResponseEntity<InputStreamResource> generateCv(@PathVariable Long id) {
        byte[] pdfBytes = pdfService.createPdf(id);
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(pdfBytes));

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=cv.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}
