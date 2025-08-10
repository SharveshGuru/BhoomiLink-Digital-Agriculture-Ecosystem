package com.bhoomilink.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bhoomilink.backend.model.RawMaterials;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.service.RawMaterialsService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@CrossOrigin
@RequestMapping("/rawmaterials")
public class RawMaterialsController {
    @Autowired
    RawMaterialsService service;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/all")
    public Map<String,Object> getAllRawMaterials(@RequestParam(defaultValue = "1") int page){
        return service.getAllRawMaterials(page);
    }

    @GetMapping("/available")
    public Map<String,Object> getAvailableRawMaterials(@RequestParam(defaultValue = "1") int page){
        return service.getAvailableRawMaterials(page);
    }

    @PostMapping("")
    public void postRawMaterial(
        @RequestParam("name") String name,
        @RequestParam("category") String category,
        @RequestParam("quantity") int quantity,
        @RequestParam("price") double price,
        @RequestParam("owner.username") String username,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        RawMaterials material = new RawMaterials();
        material.setName(name);
        material.setCategory(category);
        material.setQuantity(quantity);
        material.setPrice(price);
        material.setOwner(userRepo.findByUsername(username));

        try {
            if (image != null && !image.isEmpty()) {
                material.setImage(image.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image as blob", e);
        }

        service.addRawMaterial(material);
    }

    
}
