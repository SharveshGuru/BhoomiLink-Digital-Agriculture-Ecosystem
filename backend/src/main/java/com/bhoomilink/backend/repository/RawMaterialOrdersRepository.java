package com.bhoomilink.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.RawMaterialOrders;



@Repository
public interface RawMaterialOrdersRepository extends JpaRepository<RawMaterialOrders,Long> , JpaSpecificationExecutor<RawMaterialOrders>{
    Page<RawMaterialOrders> findByBuyerUsername(String buyer,Pageable pageable);
    Page<RawMaterialOrders> findBySellerUsername(String seller,Pageable pageable);
    
}
