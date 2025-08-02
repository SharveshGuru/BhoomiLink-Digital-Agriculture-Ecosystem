package com.bhoomilink.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.ProductOrder;
import com.bhoomilink.backend.model.User;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder,Long> {
    List<ProductOrder> findByProduct(String product);
    List<ProductOrder> findBySeller(User seller);
    List<ProductOrder> findByBuyer(User buyer);
}
