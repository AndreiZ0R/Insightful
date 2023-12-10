package com.error418.springservice.repository;

import com.error418.springservice.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository  extends JpaRepository<Experience, Long> {
}
