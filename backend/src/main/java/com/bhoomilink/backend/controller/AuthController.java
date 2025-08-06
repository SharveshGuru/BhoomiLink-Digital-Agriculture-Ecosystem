package com.bhoomilink.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.security.JwtTokenUtil;
import com.bhoomilink.backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authmanager;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService service;

    @PostMapping("/user")
    public void postNewUser(@RequestBody User data) {
        service.addUser(data);
    }

    @PostMapping("/login")
    public String login(@RequestBody User data) {
        try{
            var authToken=new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            var auth=authmanager.authenticate(authToken);
            String role=service.getRoleForUser(auth.getName());
            var jwt=jwtTokenUtil.generateToken(auth.getName(),role);
            return jwt;
        }
        catch(AuthenticationException e){
            return "Invalid Credentials";
        }
    }

    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }
}

