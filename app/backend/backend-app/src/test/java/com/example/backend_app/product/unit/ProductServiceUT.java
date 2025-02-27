package com.example.backend_app.product.unit;

import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import com.example.backend_app.products.services.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ProductServiceUT {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductCategoryRepository productCategoryRepository;

    @Mock
    private ProductVariationRepository productVariationRepository;

    @InjectMocks
    private ProductService productService;


    @Test
    void testCalculatePrice_NoDiscount() {
        ProductVariation variation = new ProductVariation();
        variation.setBasePrice(100.0);
        variation.setDiscount(0);

        productService.calculatePrice(variation);

        assertEquals(100.0, variation.getPrice());
    }

    @Test
    void testCalculatePrice_WithDiscount() {
        ProductVariation variation = new ProductVariation();
        variation.setBasePrice(200.0);
        variation.setDiscount(25);

        productService.calculatePrice(variation);

        assertEquals(150.0, variation.getPrice());
    }

    @Test
    void testCalculatePrice_FullDiscount() {
        ProductVariation variation = new ProductVariation();
        variation.setBasePrice(500.0);
        variation.setDiscount(100);

        productService.calculatePrice(variation);

        assertEquals(0.0, variation.getPrice());
    }
}
