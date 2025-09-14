package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bhoomilink.backend.model.VehicleListing;
import com.bhoomilink.backend.model.VehicleRental;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.repository.VehicleListingRepository;
import com.bhoomilink.backend.repository.VehicleRentalRepository;

import jakarta.transaction.Transactional;

@Service
public class VehicleRentalService {
    @Autowired
    VehicleRentalRepository repo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    VehicleListingRepository vehicleListingRepo;

    @Transactional
    public void addVehicleRental(VehicleRental data){
        data.setBorrower(userRepo.findByUsername(data.getBorrower().getUsername()));
        VehicleListing listing=vehicleListingRepo.findById(data.getVehicle().getId()).orElse(null);
        listing.setIsAvailable(false);
        data.setVehicle(listing);
        vehicleListingRepo.save(listing);
        repo.save(data);
    }

    @Transactional
    public Map<String,Object> getAllVechicleRentals(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleRental> vehicleRental=repo.findAll(pageable);
        Map<String, Object> response=new HashMap<>();
        
        vehicleRental.getContent().forEach(rental -> {
            if (rental.getVehicle() != null) {
                rental.getVehicle().setImage(null);
            }
        });

        response.put("total", vehicleRental.getTotalPages());
        response.put("current", page);
        response.put("limit", vehicleRental.getSize());
        response.put("data", vehicleRental.getContent());
        return response;
    }

    @Transactional
    public Map<String,Object> getByBorrower(String borrower, int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleRental> vehicleRental=repo.findByBorrowerUsername(borrower,pageable);
        Map<String, Object> response=new HashMap<>();
        vehicleRental.getContent().forEach(rental -> {
            if (rental.getVehicle() != null) {
                rental.getVehicle().setImage(null);
            }
        });
        response.put("total", vehicleRental.getTotalPages());
        response.put("current", page);
        response.put("limit", vehicleRental.getSize());
        response.put("data", vehicleRental.getContent());
        return response;
    }

    @Transactional
    public Map<String,Object> getByOwner(String owner, int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleRental> vehicleRental=repo.findByVehicleOwnerUsername(owner,pageable);
        Map<String, Object> response=new HashMap<>();
        vehicleRental.getContent().forEach(rental -> {
            if (rental.getVehicle() != null) {
                rental.getVehicle().setImage(null);
            }
        });
        response.put("total", vehicleRental.getTotalPages());
        response.put("current", page);
        response.put("limit", vehicleRental.getSize());
        response.put("data", vehicleRental.getContent());
        return response;
    }
}
