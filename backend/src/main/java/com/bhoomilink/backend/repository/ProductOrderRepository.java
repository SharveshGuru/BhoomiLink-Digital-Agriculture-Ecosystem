package com.bhoomilink.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.ProductOrder;


@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder,Long> , JpaSpecificationExecutor<ProductOrder> {
    Page<ProductOrder> findByBuyerUsername(String buyer,Pageable pageable);
    Page<ProductOrder> findBySellerUsername(String seller,Pageable pageable);
}
