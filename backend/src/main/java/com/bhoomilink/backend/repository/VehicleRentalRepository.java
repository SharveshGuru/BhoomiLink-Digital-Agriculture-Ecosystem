package com.bhoomilink.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.VehicleListing;
import com.bhoomilink.backend.model.VehicleRental;
import java.time.LocalDateTime;


@Repository
public interface VehicleRentalRepository extends JpaRepository<VehicleRental,Long>,JpaSpecificationExecutor<VehicleRental> {

    Page<VehicleRental> findByVehicle(VehicleListing vehicle, Pageable pageable);
    Page<VehicleRental> findByBorrowerUsername(String borrower,Pageable pageable);
    Page<VehicleRental> findByFinishDate(LocalDateTime finishDate,Pageable pageable);
    Page<VehicleRental> findByBeginDate(LocalDateTime beginDate,Pageable pageable);
    Page<VehicleRental> findByVehicleOwnerUsername(String username,Pageable pageable);

}
