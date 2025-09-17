package com.bhoomilink.backend.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.Employment;

import java.time.LocalDateTime;



@Repository
public interface EmploymentRepository extends JpaRepository<Employment,Long>, JpaSpecificationExecutor<Employment> {
     
    Page<Employment> findByEmployeeUsername(String username,Pageable pageable);
    Page<Employment> findByRequesterUsername(String username,Pageable pageable);
    Page<Employment> findByBeginDate(LocalDateTime begin,Pageable pageable);
    Page<Employment> findByFinishDate(LocalDateTime end,Pageable pageable);
}
