package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bhoomilink.backend.model.RawMaterials;
import com.bhoomilink.backend.repository.RawMaterialsRepository;
import com.bhoomilink.backend.repository.UserRepository;

@Service
public class RawMaterialsService {
    @Autowired
    RawMaterialsRepository repo;

    @Autowired
    UserRepository userRepo;

    public void addRawMaterial(RawMaterials data){
        repo.save(data);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAllRawMaterials(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<RawMaterials> rawmaterials = repo.findAll(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", rawmaterials.getTotalPages());
        response.put("current", page);
        response.put("limit", rawmaterials.getSize());
        response.put("data", rawmaterials.getContent());
        return response;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAvailableRawMaterials(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<RawMaterials> rawmaterials =repo.findByQuantityGreaterThan(0,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", rawmaterials.getTotalPages());
        response.put("current", page);
        response.put("limit", rawmaterials.getSize());
        response.put("data", rawmaterials.getContent());
        return response;
    }

}
