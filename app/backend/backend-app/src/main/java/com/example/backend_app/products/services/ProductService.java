package com.example.backend_app.products.services;

import com.example.backend_app.exception.ExceptionBadRequest;
import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.DTOs.EditProductDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
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
    private final ProductVariationRepository productVariationRepository;

    public Product createProduct(CreateProductDTO productDTO) throws ExceptionBadRequest {
        ProductCategory productCategory = productCategoryRepository.findById(productDTO.getCategory())
                .orElseThrow(() -> new ExceptionBadRequest("Category not found!"));


        Product product = productRepository.findByNameCategoryAndDescription(productDTO.getName(),productCategory,productDTO.getDescription());
        if(product == null){
            product = Product.fromDTO(productDTO,productCategory);
            productRepository.save(product);
        }

        ProductVariation newProductVariation = new ProductVariation();
        newProductVariation.setImageUrl(productDTO.getImageUrl());
        newProductVariation.setSize(productDTO.getSize());
        newProductVariation.setBasePrice(productDTO.getBasePrice());
        newProductVariation.setDiscount(productDTO.getDiscount());
        newProductVariation.setIn_stock(productDTO.getIn_stock());
        newProductVariation.setProduct(product);
        newProductVariation.setPrice(newProductVariation.getBasePrice() * (1 - newProductVariation.getDiscount()/100));

        productVariationRepository.save(newProductVariation);

        product.getVariations().add(newProductVariation);

        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(int page,int pageSize,List<Long> categoryId,String searchName) {
        Pageable pageable = PageRequest.of(page,pageSize);
        return productRepository.findAllWithSearchAndPagination(pageable,categoryId,searchName);
    }

    public Product editProduct(Long id, EditProductDTO editProductDTO) {
        Optional<Product> productOptional = productRepository.findById(id);
        Product product = productOptional.orElseThrow(() -> new ExceptionBadRequest("Product not found"));

        Optional<ProductVariation> variation = productVariationRepository.findById(editProductDTO.getVariation().getId());
        ProductVariation productVariation = variation.orElseThrow(() -> new ExceptionBadRequest("Variation not found"));

        //checking if variation belongs to the product sent in dto
        boolean rightVariation=false;
        for(ProductVariation prodVar : product.getVariations()){
            if(prodVar.getId().equals(editProductDTO.getVariation().getId())){
                rightVariation=true;
            }
        }
        if(!rightVariation){
            throw new ExceptionBadRequest("Variation does not belong to this product!");
        }


        if(editProductDTO.getVariation().getIn_stock()!=null){
            productVariation.setIn_stock(editProductDTO.getVariation().getIn_stock());
        }
        if(editProductDTO.getName()!=null){
            product.setName(editProductDTO.getName());
        }
        if(editProductDTO.getDescription()!=null){
            product.setDescription(editProductDTO.getDescription());
        }
        if(editProductDTO.getVariation().getDiscount()!=null){
            productVariation.setDiscount(editProductDTO.getVariation().getDiscount());
            calculatePrice(productVariation);
        }
        if(editProductDTO.getVariation().getBasePrice()!=null){
            productVariation.setBasePrice(editProductDTO.getVariation().getBasePrice());
            calculatePrice(productVariation);
        }
        if(editProductDTO.getCategory()!=null){
            product.setCategory(productCategoryRepository.findById(editProductDTO.getCategory()).orElseThrow(() -> new ExceptionBadRequest("Category not found")));
        }
        if(editProductDTO.getVariation().getImageUrl()!=null){
            productVariation.setImageUrl(editProductDTO.getVariation().getImageUrl());
        }
        if(editProductDTO.getVariation().getSize()!=null){
            productVariation.setSize(editProductDTO.getVariation().getSize());
        }

        productVariationRepository.save(productVariation);
        return productRepository.save(product);

    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ExceptionBadRequest("Product not found"));
    }

    public void calculatePrice(ProductVariation variation) {
        variation.setPrice(variation.getBasePrice() * (1 - variation.getDiscount()/100.0));
    }
}
