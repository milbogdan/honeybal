package com.example.backend_app.products.services;

import com.example.backend_app.global.exception.ExceptionBadRequest;
import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.products.DTOs.ProductCategoryDTO;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> findAll() {
        return productCategoryRepository.findAll();
    }

    public void deleteProductCategory(long id) {
        if(!productCategoryRepository.existsById(id)) {
            throw new ExceptionNotFound("Product category not found");
        }
        productCategoryRepository.deleteById(id);
    }

    public ProductCategory createProductCategory(ProductCategoryDTO productCategory) {
        if(!StringUtils.hasText(productCategory.getName())){
            throw new ExceptionBadRequest("Product category name cannot be empty!");
        }
        ProductCategory productCategoryEntity = new ProductCategory();
        productCategoryEntity.setName(productCategory.getName());
        return productCategoryRepository.save(productCategoryEntity);
    }

    public ProductCategory editProductCategory(Long id, ProductCategoryDTO productCategoryDTO) {
        if(!StringUtils.hasText(productCategoryDTO.getName())){
            throw new ExceptionBadRequest("Product category name cannot be empty!");
        }
        ProductCategory productCategoryEntity = productCategoryRepository.findById(id).orElseThrow(()
                -> new ExceptionNotFound("Product category not found"));
        productCategoryEntity.setName(productCategoryDTO.getName());
        return productCategoryRepository.save(productCategoryEntity);

    }
}
