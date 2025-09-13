package com.bhoomilink.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bhoomilink.backend.model.Product;
import com.bhoomilink.backend.repository.ProductRepository;
import com.bhoomilink.backend.repository.UserRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository repo;

    @Autowired
    UserRepository userRepo;

    public void addProduct(Product data){
        repo.save(data);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAllProduct(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<Product> products = repo.findAll(pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", products.getTotalPages());
        response.put("current", page);
        response.put("limit", products.getSize());
        response.put("data", products.getContent());
        return response;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAvailableProduct(int page){
        Pageable pageable=PageRequest.of(page,10);
        Page<Product> product =repo.findByQuantityGreaterThan(0,pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", product.getTotalPages());
        response.put("current", page);
        response.put("limit", product.getSize());
        response.put("data", product.getContent());
        return response;
    }

    @Transactional(readOnly = true)
    public Map<String,Object> getProductByOwner(int page, String owner){
        Pageable pageable=PageRequest.of(page,10);
        Page<Product> products =repo.findByOwnerUsername(owner, pageable);
        Map<String, Object> response=new HashMap<>();
        response.put("total", products.getTotalPages());
        response.put("current", page);
        response.put("limit", products.getSize());
        response.put("data", products.getContent());
        return response;
    }

    @Transactional
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public void updateProduct(Product product) {
        repo.save(product);
    }

    @Transactional
    public void updateQuantity(Long id, int quantity){
        Product product=repo.findById(id).orElse(null);
        product.setQuantity(product.getQuantity()-quantity);
        repo.save(product);
    }

    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
