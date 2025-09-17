package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bhoomilink.backend.model.Employment;
import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.repository.EmploymentRepository;
import com.bhoomilink.backend.repository.UserRepository;

@Service
public class EmploymentService {
    @Autowired
    EmploymentRepository repo;

    @Autowired
    UserRepository userRepo;

    public void addEmployment(Employment data){
        User employee=userRepo.findByUsername(data.getEmployee().getUsername());
        employee.setIsAvailable(false);
        data.setEmployee(employee);
        data.setRequester(userRepo.findByUsername(data.getRequester().getUsername()));
        userRepo.save(employee);
        repo.save(data);
    }

    public Map<String,Object> getAllEmployment(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<Employment> employment=repo.findAll(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", employment.getTotalPages());
        response.put("current", page);
        response.put("limit", employment.getSize());
        response.put("data", employment.getContent());
        return response;
    }

    public Map<String,Object> getByEmployee(String employee,int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<Employment> employment=repo.findByEmployeeUsername(employee,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", employment.getTotalPages());
        response.put("current", page);
        response.put("limit", employment.getSize());
        response.put("data", employment.getContent());
        return response;
    }

    public Map<String,Object> getByRequester(String requester,int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<Employment> employment=repo.findByRequesterUsername(requester,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", employment.getTotalPages());
        response.put("current", page);
        response.put("limit", employment.getSize());
        response.put("data", employment.getContent());
        return response;
    }

    public void deleteEmployment(String username){
        User employee=userRepo.findByUsername(username);
        employee.setIsAvailable(true);
        userRepo.save(employee);
    }
}
