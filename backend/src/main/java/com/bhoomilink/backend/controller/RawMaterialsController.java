package com.bhoomilink.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.RawMaterials;
import com.bhoomilink.backend.service.RawMaterialsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/rawmaterials")
public class RawMaterialsController {
    @Autowired
    RawMaterialsService service;

    @GetMapping("/all")
    public Map<String,Object> getAllRawMaterials(@RequestParam(defaultValue = "1") int page){
        return service.getAllRawMaterials(page);
    }

    @GetMapping("/available")
    public Map<String,Object> getAvailableRawMaterials(@RequestParam(defaultValue = "1") int page){
        return service.getAvailableRawMaterials(page);
    }

    @PostMapping("")
    public void postRawMaterial(@RequestBody RawMaterials entity) {
        service.addRawMaterial(entity);
    }
    
}
