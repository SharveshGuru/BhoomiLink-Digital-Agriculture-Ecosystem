package com.bhoomilink.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.VehicleRental;
import com.bhoomilink.backend.service.VehicleRentalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin
@RequestMapping("/vehiclerental")
public class VehicleRentalController {
    @Autowired
    VehicleRentalService service;

    @GetMapping("/all")
    public Map<String,Object> getAllRentals(@RequestParam(defaultValue = "1") int page) {
        return service.getAllVechicleRentals(page);
    }
    
    @GetMapping("/owner/{owner}")
    public Map<String,Object> getRentalsByOwner(@RequestParam(defaultValue = "1") int page,@PathVariable String owner){
        return service.getByOwner(owner, page);
    }

    @GetMapping("/borrower/{borrower}")
    public Map<String,Object> getRentalsByBorrower(@RequestParam(defaultValue = "1") int page,@PathVariable String borrower){
        return service.getByBorrower(borrower, page);
    }

    @PostMapping("")
    public void postRental(@RequestBody VehicleRental entity) {
        service.addVehicleRental(entity);
    }
    
}
