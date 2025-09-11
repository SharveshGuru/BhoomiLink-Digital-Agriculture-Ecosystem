package com.bhoomilink.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bhoomilink.backend.model.Product;
import com.bhoomilink.backend.repository.UserRepository;
import com.bhoomilink.backend.service.ProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService service;

    @Autowired
    UserRepository userRepo;

    @GetMapping("/all")
    public Map<String,Object> getAllProduct(@RequestParam(defaultValue = "0") int page){
        return service.getAllProduct(page);
    }

    @GetMapping("/available")
    public Map<String,Object> getAvailableProduct(@RequestParam(defaultValue = "0") int page){
        return service.getAvailableProduct(page);
    }

    @PostMapping("")
    public void postProduct(
        @RequestParam("name") String name,
        @RequestParam("quantity") int quantity,
        @RequestParam("price") double price,
        @RequestParam("owner.username") String username,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        Product product = new Product();
        product.setName(name);
        product.setQuantity(quantity);
        product.setPrice(price);
        product.setOwner(userRepo.findByUsername(username));

        try {
            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image as blob", e);
        }

        service.addProduct(product);
    }

    @GetMapping("/{username}")
    public Map<String,Object> getProductByOwner(@RequestParam(defaultValue = "0") int page, @PathVariable String username){
        return service.getProductByOwner(page, username);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        service.deleteProduct(id);
    }
    
    @PutMapping("/{id}")
    public void putProduct(
        @PathVariable Long id,
        @RequestParam(value = "name", required = false) String name,
        @RequestParam(value = "quantity", required = false) Integer quantity,
        @RequestParam(value = "price", required = false) Double price,
        @RequestParam(value = "image", required = false) MultipartFile image) {
        
        
        Product product = service.getProductById(id);

        if (name != null) product.setName(name);
        if (quantity != null) product.setQuantity(quantity);
        if (price != null) product.setPrice(price);
        try{
            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }
        }
        catch(Exception e){
            System.out.println(e.getLocalizedMessage());
        }

        service.updateProduct(product);
    }
}
