package com.error418.springservice.service;

import com.error418.springservice.model.Experience;
import com.error418.springservice.model.Study;
import com.error418.springservice.model.User;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;
// import other necessary classes

@Service
public class PdfService {
    @Autowired
    private UserService userService;

    public byte[] createPdf(Long id) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Optional<User> userDto= userService.findUserById(id);
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Adding user details
        document.add(new Paragraph("CV for " + userDto.get().getName())
                .setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("Email: " + userDto.get().getEmail()));
        document.add(new Paragraph("Phone: " + userDto.get().getPhoneNumber()));

        // Adding studies
        List<Study> studies = userDto.get().getProfile().getStudies();
        if (!studies.isEmpty()) {
            document.add(new Paragraph("Studies").setBold());
            for (Study study : studies) {
                document.add(new Paragraph(study.getDegree() + " - " + study.getStudyLocation())
                        .setItalic());
                document.add(new Paragraph("From: " + study.getStartDate() + " To: " + study.getEndDate()));
            }
        }

        // Adding experiences
        List<Experience> experiences = userDto.get().getProfile().getExperiences();
        if (!experiences.isEmpty()) {
            document.add(new Paragraph("Experiences").setBold());
            for (Experience exp : experiences) {
                document.add(new Paragraph(exp.getPosition() + " at " + exp.getCompany())
                        .setItalic());
                document.add(new Paragraph("From: " + exp.getStartDate() + " To: " + exp.getEndDate()));
                // Skills under each experience
                if (!exp.getSkills().isEmpty()) {
                    document.add(new Paragraph("Skills:"));
                    exp.getSkills().forEach(skill -> document.add(new Paragraph(skill.getSkillName())));
                }
            }
        }

        // Add more details as necessary

        document.close();
        return byteArrayOutputStream.toByteArray();
    }
}
