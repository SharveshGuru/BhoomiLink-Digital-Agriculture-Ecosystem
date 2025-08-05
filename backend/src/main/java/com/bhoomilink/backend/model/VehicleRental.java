package com.bhoomilink.backend.model;
import java.time.LocalDateTime;

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
@Table(name="vehiclerental")
public class VehicleRental {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="vehicle_id",nullable = false)
    private VehicleListing vehicle;
    @ManyToOne
    @JoinColumn(name="borrower_id",nullable = false)
    private User borrower;
    @Column(nullable = false)
    private LocalDateTime start;
    @Column(nullable = false)
    private LocalDateTime end;
}
