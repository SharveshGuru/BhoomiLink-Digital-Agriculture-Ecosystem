package com.bhoomilink.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.VehicleListing;
import java.util.List;


@Repository
public interface VehicleListingRepository extends JpaRepository<VehicleListing,Long>, JpaSpecificationExecutor<VehicleListing> {

    List<VehicleListing> findByVehicleType(String vehicleType);
    Page<VehicleListing> findByOwnerUsername(String username,Pageable pageable);
    Page<VehicleListing> findByIsAvailable(Boolean isAvailable, Pageable pageable);
}
