package com.example.backend_app.products.controllers;

import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.services.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
