package com.bhoomilink.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.model.VehicleListing;
import com.bhoomilink.backend.model.VehicleRental;
import java.time.LocalDateTime;


@Repository
public interface VehicleRentalRepository extends JpaRepository<VehicleRental,Long>,JpaSpecificationExecutor<VehicleRental> {

    List<VehicleRental> findByVehicle(VehicleListing vehicle);
    List<VehicleRental> findByBorrower(User borrower);
    List<VehicleRental> findByFinishDate(LocalDateTime finishDate);
    List<VehicleRental> findByBeginDate(LocalDateTime beginDate);
}
