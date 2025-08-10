package com.bhoomilink.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.Employment;
import com.bhoomilink.backend.model.User;

import java.util.List;
import java.time.LocalDateTime;



@Repository
public interface EmploymentRepository extends JpaRepository<Employment,Long>, JpaSpecificationExecutor<Employment> {
     
    List<Employment> findByEmployee(User employee);
    List<Employment> findByRequester(User requester);
    List<Employment> findByBeginDate(LocalDateTime begin);
    List<Employment> findByFinishDate(LocalDateTime end);
    
}
