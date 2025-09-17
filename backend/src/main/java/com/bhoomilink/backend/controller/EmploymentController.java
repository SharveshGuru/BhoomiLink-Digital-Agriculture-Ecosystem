package com.bhoomilink.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.Employment;
import com.bhoomilink.backend.service.EmploymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin
@RequestMapping("/employment")
public class EmploymentController {
    @Autowired
    EmploymentService service;

    @PostMapping("")
    public void postEmployment(@RequestBody Employment entity) {
        service.addEmployment(entity);
    }
    
    @DeleteMapping("/{username}")
    public void deleteEmployment(@PathVariable String username){
        service.deleteEmployment(username);
    }

    @GetMapping("/employee/{username}")
    public Map<String,Object> getByEmployee(@RequestParam int page,@PathVariable String username) {
        return service.getByEmployee(username,page);
    }

    @GetMapping("/requester/{username}")
    public Map<String,Object> getByRequester(@RequestParam int page,@PathVariable String username) {
        return service.getByRequester(username,page);
    }
    
}
