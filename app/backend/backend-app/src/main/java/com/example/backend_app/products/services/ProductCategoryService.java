package com.example.backend_app.products.services;

import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> findAll() {
        return productCategoryRepository.findAll();
    }
}
