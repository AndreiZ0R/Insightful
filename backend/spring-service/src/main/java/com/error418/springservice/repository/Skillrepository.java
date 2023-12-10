package com.error418.springservice.repository;

import com.error418.springservice.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Skillrepository extends JpaRepository<Skill, Long> {
}
