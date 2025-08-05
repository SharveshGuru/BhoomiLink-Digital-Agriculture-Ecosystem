package com.bhoomilink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bhoomilink.backend.model.User;
import com.bhoomilink.backend.repository.UserRepository;

@Component
public class CreateSuperUser implements CommandLineRunner {
    
    @Autowired
    private UserRepository repo;
    
    @Autowired
    private PasswordEncoder pwdencoder;

    @Override
    public void run(String... args) throws Exception {

        if (repo.findByUsername("admin") == null) {
            User superUser = new User();
            superUser.setName("Admin");
            superUser.setEmail("admin@gmail.com");
            superUser.setPhonenumber("111");
            superUser.setUserType("Admin");
            superUser.setUsername("admin");
            superUser.setPassword(pwdencoder.encode("superuser")); 
            superUser.setAddress("nil");
            repo.save(superUser);
            System.out.println("Superuser created: " + superUser.getUsername());
        } else {
            System.out.println("Superuser already exists.");
        }
    }
}