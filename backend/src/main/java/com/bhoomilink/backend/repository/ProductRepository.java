package com.bhoomilink.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.bhoomilink.backend.model.Product;
import com.bhoomilink.backend.model.User;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{
    List<Product> findByName(String name);
    List<Product> findByOwner(User owner);
    Page<Product> findByOwnerUsername(String owner,Pageable pageable);
    Page<Product> findByQuantityGreaterThan(int quantity, Pageable pageable);
}