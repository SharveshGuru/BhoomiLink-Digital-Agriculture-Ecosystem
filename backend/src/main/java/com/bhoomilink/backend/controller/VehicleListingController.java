package com.bhoomilink.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bhoomilink.backend.model.VehicleListing;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.service.VehicleListingService;

import jakarta.persistence.Column;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin
@RequestMapping("/vehiclelisting")
public class VehicleListingController {
    @Autowired
    VehicleListingService service;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/all")
    public Map<String,Object> getAllVechicleListing(@RequestParam(defaultValue = "1") int page){
        return service.getAllVechicleListing(page);
    }

    @GetMapping("/{username}")
    public Map<String,Object> getByOwner(@RequestParam(defaultValue = "1") int page,@PathVariable String username){
        return service.getByOwner(username,page);
    }

    @GetMapping("/available")
    public Map<String,Object> getAvailableVechicleListing(@RequestParam(defaultValue = "1") int page){
        return service.getAvailableVechicleListing(page);
    }

    @PostMapping("")
    public void postVehicleListing(
        @RequestParam("username") String username,
        @RequestParam("vehicleType") String vehicleType,
        @RequestParam("price") double price,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        VehicleListing vehicle = new VehicleListing();
        vehicle.setVehicleType(vehicleType);
        vehicle.setPrice(price);
        vehicle.setOwner(userRepo.findByUsername(username));

        try {
            if (image != null && !image.isEmpty()) {
                vehicle.setImage(image.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image as blob", e);
        }

        service.addVehicleListing(vehicle);
    }
    @DeleteMapping("/{id}")
    public void deleteVehicleListing(@PathVariable Long id){
        service.deleteVehicleListing(id);
    }
    
    @PutMapping("/{id}")
    public void putVehicleListing(
        @PathVariable Long id,
        @RequestParam(value = "vehicleType", required = false) String vehicleType,
        @RequestParam(value = "price", required = false) Double price,
        @RequestParam(value = "isAvailable", required = false) Boolean isAvailable,
        @RequestParam(value = "image", required = false) MultipartFile image) {
        

        
        VehicleListing vehicle = service.getVehicleListingById(id);

        if (vehicleType != null) vehicle.setVehicleType(vehicleType);
        if (isAvailable!= null) vehicle.setIsAvailable(isAvailable);
        if (price != null) vehicle.setPrice(price);
        try{
            if (image != null && !image.isEmpty()) {
                vehicle.setImage(image.getBytes());
            }
        }
        catch(Exception e){
            System.out.println(e.getLocalizedMessage());
        }

        service.updateVehicleListing(vehicle);
    }

    
}