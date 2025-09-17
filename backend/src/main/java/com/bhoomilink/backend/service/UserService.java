package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository repo;

    @Autowired
    PasswordEncoder pwdEncoder;

    public List<User> getUsers(){
        return repo.findAll();
    }

    public void addUser(User data){
        data.setPassword(pwdEncoder.encode(data.getPassword()));
        repo.save(data);
    }

    public User getUserByUsername(String username){
        return repo.findByUsername(username);
    }

    public String getRoleForUser(String username){
        User user=getUserByUsername(username);
        if(user!=null){
            return user.getUserType();
        }
        return "";
    }

    public void updateUser(String username,User data){
        User user=repo.findByUsername(username);
        user.setName(data.getName());
        user.setEmail(data.getEmail());
        user.setPhonenumber(data.getPhonenumber());
        user.setAddress(data.getAddress());
        user.setUserType(data.getUserType());
        user.setIsVehicleOwner(data.getIsVehicleOwner());
        user.setIsFarmer(data.getIsFarmer());
        user.setIsWorker(data.getIsWorker());
        user.setIsMerchant(data.getIsMerchant());

        repo.save(user);
    }

    public void changePassword(String username, String password){
        User user=repo.findByUsername(username);
        user.setPassword(pwdEncoder.encode(password));

        repo.save(user);
    }

    public Map<String,Object> getAllWorkers(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<User> workers=repo.findByIsWorkerTrue(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", workers.getTotalPages());
        response.put("current", page);
        response.put("limit", workers.getSize());
        response.put("data", workers.getContent());
        return response;
    }

    public Map<String,Object> getAvailableWorkers(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<User> workers=repo.findByIsWorkerTrueAndIsAvailableTrue(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", workers.getTotalPages());
        response.put("current", page);
        response.put("limit", workers.getSize());
        response.put("data", workers.getContent());
        return response;
    } 
}
