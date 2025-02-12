package com.example.backend_app.products.services;

import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public Product createProduct(CreateProductDTO productDTO) throws ExceptionBadRequest {
        ProductCategory productCategory = productCategoryRepository.findById(productDTO.getCategory())
                .orElseThrow(() -> new ExceptionBadRequest("Category not found"));

        return productRepository.save(Product.fromDTO(productDTO,productCategory));
    }

    public Page<Product> getAllProducts(int page,int pageSize,Integer categoryId,String searchName) {
        Pageable pageable = PageRequest.of(page,pageSize);
        return productRepository.findAllWithSearchAndPagination(pageable,categoryId,searchName);
    }
}
