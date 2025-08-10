package com.bhoomilink.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bhoomilink.backend.model.RawMaterials;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.service.RawMaterialsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin
@RequestMapping("/rawmaterials")
public class RawMaterialsController {
    @Autowired
    RawMaterialsService service;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/all")
    public Map<String,Object> getAllRawMaterials(@RequestParam(defaultValue = "0") int page){
        return service.getAllRawMaterials(page);
    }

    @GetMapping("/available")
    public Map<String,Object> getAvailableRawMaterials(@RequestParam(defaultValue = "0") int page){
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

    @GetMapping("/{username}")
    public Map<String,Object> getRawMaterialsByOwner(@RequestParam(defaultValue = "0") int page, @PathVariable String username){
        return service.getRawMaterialsByOwner(page, username);
    }

    @DeleteMapping("/{id}")
    public void deleteRawMaterial(@PathVariable Long id){
        service.deleteRawMaterial(id);
    }
    
    @PutMapping("/{id}")
    public void putRawMaterial(
        @PathVariable Long id,
        @RequestParam(value = "name", required = false) String name,
        @RequestParam(value = "category", required = false) String category,
        @RequestParam(value = "quantity", required = false) Integer quantity,
        @RequestParam(value = "price", required = false) Double price,
        @RequestParam(value = "image", required = false) MultipartFile image) {
        
        
        RawMaterials material = service.getRawMaterialById(id);

        if (name != null) material.setName(name);
        if (category != null) material.setCategory(category);
        if (quantity != null) material.setQuantity(quantity);
        if (price != null) material.setPrice(price);
        try{
            if (image != null && !image.isEmpty()) {
                material.setImage(image.getBytes());
            }
        }
        catch(Exception e){
            System.out.println(e.getLocalizedMessage());
        }

        service.updateRawMaterial(material);
    }
}
