package com.example.backend_app.products.controllers;

import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.services.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    @PostMapping("/post")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name="bearerAuth")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductDTO product){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Product>> getAllProducts(@RequestParam int page, @RequestParam int pageSize, @RequestParam(required = false) Integer categoryId, @RequestParam(required = false) String searchName){
        Page<Product> products=productService.getAllProducts(page,pageSize,categoryId,searchName);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

}
