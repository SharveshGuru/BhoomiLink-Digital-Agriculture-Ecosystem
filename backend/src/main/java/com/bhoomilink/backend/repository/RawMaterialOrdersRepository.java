package com.bhoomilink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.RawMaterialOrders;
import com.bhoomilink.backend.model.User;

import java.util.List;


@Repository
public interface RawMaterialOrdersRepository extends JpaRepository<RawMaterialOrders,Long> {
    List<RawMaterialOrders> findByProduct(String product);
    List<RawMaterialOrders> findByBuyer(User buyer);
    List<RawMaterialOrders> findBySeller(User seller);
    
}
