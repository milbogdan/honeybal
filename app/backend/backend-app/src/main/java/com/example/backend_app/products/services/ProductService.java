package com.example.backend_app.products.services;

import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.DTOs.EditProductDTO;
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

    public Product editProduct(Long id, EditProductDTO editProductDTO) {
        Optional<Product> productOptional = productRepository.findById(id);
        Product product = productOptional.orElseThrow(() -> new ExceptionBadRequest("Product not found"));
        if(editProductDTO.getIn_stock()!=null){
            product.setIn_stock(editProductDTO.getIn_stock());
        }
        if(editProductDTO.getName()!=null){
            product.setName(editProductDTO.getName());
        }
        if(editProductDTO.getDescription()!=null){
            product.setDescription(editProductDTO.getDescription());
        }
        if(editProductDTO.getDiscount()!=null){
            product.setDiscount(editProductDTO.getDiscount());
            product.calculatePrice();
        }
        if(editProductDTO.getBasePrice()!=null){
            product.setBasePrice(editProductDTO.getBasePrice());
            product.calculatePrice();
        }
        if(editProductDTO.getCategory()!=null){
            product.setCategory(productCategoryRepository.findById(editProductDTO.getCategory()).orElseThrow(() -> new ExceptionBadRequest("Category not found")));
        }
        if(editProductDTO.getImageUrl()!=null){
            product.setImageUrl(editProductDTO.getImageUrl());
        }
        if(editProductDTO.getSize()!=null){
            product.setSize(editProductDTO.getSize());
        }

        return productRepository.save(product);

    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ExceptionBadRequest("Product not found"));
    }
}
