package com.example.backend_app.products.controllers;

import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.services.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    @PostMapping("/secured/post")
    @SecurityRequirement(name="bearerAuth")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductDTO product){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
    }
}
