package com.bhoomilink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.Ratings;
import com.bhoomilink.backend.model.User;

import java.util.List;


@Repository
public interface RatingsRepository extends JpaRepository<Ratings,Long>, JpaSpecificationExecutor<Ratings> {
    List<Ratings> findByUser(User user);
    List<Ratings> findByType(String type);
}
