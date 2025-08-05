package com.bhoomilink.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository user;

    public List<User> getUsers(){
        return user.findAll();
    }

    public void addUsers(User data){

    }

    public User getUserByUsername(String username){
        return (User) user.findByName(username);
    }

}
