package com.bhoomilink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bhoomilink.backend.model.User;


@Repository
public  interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User>{

    User findByUsername(String name);
}