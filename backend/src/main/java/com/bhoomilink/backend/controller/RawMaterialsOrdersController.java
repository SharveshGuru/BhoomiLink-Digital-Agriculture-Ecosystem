package com.bhoomilink.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.RawMaterialOrders;
import com.bhoomilink.backend.repository.RawMaterialsRepository;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.service.RawMaterialsOrdersService;
import com.bhoomilink.backend.service.RawMaterialsService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/rawmaterialsorders")
public class RawMaterialsOrdersController {
    @Autowired
    RawMaterialsOrdersService service;

    @Autowired
    UserRepository userRepo;

    @Autowired
    RawMaterialsRepository rawMaterialsRepo;

    @Autowired
    RawMaterialsService rawMaterialsService;

    @GetMapping("/all")
    public Map<String,Object> getAllOrders(@RequestParam(defaultValue = "0") int page){
        return service.getAllOrders(page);
    }

    @GetMapping("/buyer/{username}")
    public Map<String,Object> getOrdersByBuyer(@RequestParam(defaultValue = "0") int page, @PathVariable String username){
        return service.getOrdersByBuyer(page, username);
    }
    
    @GetMapping("/seller/{username}")
    public Map<String,Object> getOrdersBySeller(@RequestParam(defaultValue = "0") int page, @PathVariable String username){
        return service.getOrdersBySeller(page, username);
    }

    @PostMapping("")
    public void postOrder(@RequestBody RawMaterialOrders entity) {
        entity.setBuyer(userRepo.findByUsername(entity.getBuyer().getUsername()));
        entity.setSeller(userRepo.findByUsername(entity.getSeller().getUsername()));
        entity.setRawMaterials(rawMaterialsRepo.findById(entity.getRawMaterials().getId()).orElse(null));
        entity.setPrice(entity.getQuantity() * entity.getRawMaterials().getPrice());
        entity.setOrderDate(LocalDateTime.now());
        
        System.out.println("Saving orderDate = " + entity.getOrderDate());

        rawMaterialsService.updateQuantity(entity.getRawMaterials().getId(), entity.getQuantity());
        service.addOrder(entity);
    }
    
}
