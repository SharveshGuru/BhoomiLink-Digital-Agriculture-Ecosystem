package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bhoomilink.backend.model.VehicleListing;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.repository.VehicleListingRepository;

@Service
public class VehicleListingService {
    @Autowired
    VehicleListingRepository repo;

    @Autowired
    UserRepository userRepo;

    public void addVehicleListing(VehicleListing data){
        data.setOwner(userRepo.findByUsername(data.getOwner().getUsername()));
        repo.save(data);
    }
    
    @Transactional
    public Map<String, Object> getAllVechicleListing(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleListing> vehiclelisting = repo.findAll(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", vehiclelisting.getTotalPages());
        response.put("current", page);
        response.put("limit", vehiclelisting.getSize());
        response.put("data", vehiclelisting.getContent());
        return response;
    }

    @Transactional
    public Map<String, Object> getByOwner(String username,int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleListing> vehiclelisting = repo.findByOwnerUsername(username,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", vehiclelisting.getTotalPages());
        response.put("current", page);
        response.put("limit", vehiclelisting.getSize());
        response.put("data", vehiclelisting.getContent());
        return response;
    }

    @Transactional
    public Map<String, Object> getAvailableVechicleListing(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<VehicleListing> vehiclelisting = repo.findByIsAvailable(true,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", vehiclelisting.getTotalPages());
        response.put("current", page);
        response.put("limit", vehiclelisting.getSize());
        response.put("data", vehiclelisting.getContent());
        return response;
    }


    @Transactional
    public void updateVehicleListing(VehicleListing vehicle) {
        repo.save(vehicle);
    }

    @Transactional
    public void deleteVehicleListing(Long id) {
        repo.deleteById(id);
    }

    
    @Transactional
    public VehicleListing getVehicleListingById(Long id) {
        return repo.findById(id).orElse(null);
    }

}