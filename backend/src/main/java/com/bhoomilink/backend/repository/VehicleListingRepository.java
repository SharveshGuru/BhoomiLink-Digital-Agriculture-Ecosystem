package com.bhoomilink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.model.VehicleListing;
import java.util.List;


@Repository
public interface VehicleListingRepository extends JpaRepository<VehicleListing,Long> {

    List<VehicleListing> findByVehicleType(String vehicleType);
    List<VehicleListing> findByOwner(User owner);
}
