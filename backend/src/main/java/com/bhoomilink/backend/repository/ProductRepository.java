package com.bhoomilink.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.Product;
import com.bhoomilink.backend.model.User;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findByName(String name);
    List<Product> findByOwner(User owner);
}
