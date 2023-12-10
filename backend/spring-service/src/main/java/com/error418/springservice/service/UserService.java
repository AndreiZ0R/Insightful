package com.error418.springservice.service;



import com.error418.springservice.controller.UserProfileDto;
import com.error418.springservice.model.*;

import com.error418.springservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUserProfile(UserProfileDto dto) {
        BCryptPasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        User user = new User();
        // Map User fields from DTO
        user.setName(dto.getName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setUserType(dto.getUserType());
        user.setPartialBlindness(dto.isPartialBlindness());
        user.setFullBlindness(dto.isFullBlindness());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setBirthDate(dto.getBirthDate());

        Profile profile = new Profile();
        // Map Profile fields from DTO
        profile.setCurrentTitle(dto.getProfile().getCurrentTitle());
        profile.setCurrentWorkplace(dto.getProfile().getCurrentWorkplace());

        // Map Studies from DTO
        profile.setStudies(dto.getProfile().getStudies().stream().map(studyDto -> {
            Study study = new Study();
            // Set study properties from studyDto
            study.setStartDate(studyDto.getStartDate());
            study.setEndDate(studyDto.getEndDate());
            study.setDegree(studyDto.getDegree());
            study.setStudyLocation(studyDto.getStudyLocation());
            return study;
        }).collect(Collectors.toList()));

        // Map Experiences from DTO
        profile.setExperiences(dto.getProfile().getExperiences().stream().map(expDto -> {
            Experience experience = new Experience();
            // Set experience properties from expDto
            experience.setStartDate(expDto.getStartDate());
            experience.setEndDate(expDto.getEndDate());
            experience.setCompany(expDto.getCompany());
            experience.setPosition(expDto.getPosition());
            experience.setSkills(expDto.getSkills().stream().map(skillDto -> {
                Skill skill = new Skill();
                // Set skill properties from skillDto
                skill.setSkillName(skillDto.getSkillName());
                return skill;
            }).collect(Collectors.toList()));
            return experience;
        }).collect(Collectors.toList()));

        user.setProfile(profile);

        return userRepository.save(user);
    }

    public Optional<User> findUserById(Long id){
        return userRepository.findById(id);
    }

    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }
}
