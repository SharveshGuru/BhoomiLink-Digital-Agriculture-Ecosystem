package com.bhoomilink.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="product_orders")
public class ProductOrder {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String product;
    @ManyToOne
    @JoinColumn(name="seller_id",nullable = false)
    private User seller;
    @ManyToOne
    @JoinColumn(name="buyer_id",nullable = false)
    private User buyer;
    @Column(nullable = false)
    private Long price;
    @Column(nullable = false)
    private Integer quantity;
}
