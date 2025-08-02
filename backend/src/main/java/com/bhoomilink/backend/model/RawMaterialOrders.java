package com.bhoomilink.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="rawmaterialorders")
public class RawMaterialOrders {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String product;
    @ManyToOne
    @Column(nullable = false)
    private User seller;
    @ManyToOne
    @Column(nullable = false)
    private User buyer;
    @Column(nullable = false)
    private Long price;
    @Column(nullable = false)
    private Integer quantity;
}
