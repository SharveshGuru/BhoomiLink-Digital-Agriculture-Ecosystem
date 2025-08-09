package com.bhoomilink.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.service.UserService;

@RestController
public class UserController {
    @Autowired
    UserService service;
    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user= service.getUserByUsername(username);
        user.setPassword("");
        return user;
    }
}
