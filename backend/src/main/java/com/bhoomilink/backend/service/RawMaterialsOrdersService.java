package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bhoomilink.backend.model.RawMaterialOrders;
import com.bhoomilink.backend.repository.RawMaterialOrdersRepository;

@Service
public class RawMaterialsOrdersService {
    @Autowired
    RawMaterialOrdersRepository repo;

    public void addOrder(RawMaterialOrders order){
        repo.save(order);
    }

    public Map<String,Object> getAllOrders(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<RawMaterialOrders> orders=repo.findAll(pageable);
        Map<String,Object> response=new HashMap<>();
        response.put("total", orders.getTotalPages());
        response.put("current", page);
        response.put("limit", orders.getSize());
        response.put("data", orders.getContent());
        return response;
    }

    public Map<String,Object> getOrdersByBuyer(int page,String buyer){
        Pageable pageable=PageRequest.of(page,10);
        Page<RawMaterialOrders> orders=repo.findByBuyerUsername(buyer,pageable);
        Map<String,Object> response=new HashMap<>();
        response.put("total", orders.getTotalPages());
        response.put("current", page);
        response.put("limit", orders.getSize());
        response.put("data", orders.getContent());
        return response;
    }

    public Map<String,Object> getOrdersBySeller(int page,String seller){
        Pageable pageable=PageRequest.of(page,10);
        Page<RawMaterialOrders> orders=repo.findBySellerUsername(seller,pageable);
        Map<String,Object> response=new HashMap<>();
        response.put("total", orders.getTotalPages());
        response.put("current", page);
        response.put("limit", orders.getSize());
        response.put("data", orders.getContent());
        return response;
    }
}
