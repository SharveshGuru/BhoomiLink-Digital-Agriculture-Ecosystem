package com.bhoomilink.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
