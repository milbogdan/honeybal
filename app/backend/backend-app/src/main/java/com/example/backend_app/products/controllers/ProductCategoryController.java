package com.example.backend_app.products.controllers;

import com.example.backend_app.global.DTOs.MessageResponse;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.services.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productCategories")
@RequiredArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;

    @GetMapping("/getAll")
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryService.findAll();
    }

    @DeleteMapping("/delete{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> delete(@PathVariable long id) {
        productCategoryService.deleteProductCategory(id);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Product category successfully deleted!"));
    }
}
