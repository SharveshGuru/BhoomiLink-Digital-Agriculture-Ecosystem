package com.bhoomilink.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.RawMaterials;
import com.bhoomilink.backend.model.User;

import java.util.List;


@Repository
public interface RawMaterialsRepository extends JpaRepository<RawMaterials,Long> , JpaSpecificationExecutor<RawMaterials> {

    List<RawMaterials> findByCategory(String category);
    List<RawMaterials> findByName(String name);
    List<RawMaterials> findByOwner(User owner);
    Page<RawMaterials> findByQuantityGreaterThan(int quantity, Pageable pageable);
    
}