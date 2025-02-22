package com.example.backend_app.product.integration;

import com.example.backend_app.global.exception.ExceptionBadRequest;
import com.example.backend_app.products.DTOs.CreateProductDTO;
import com.example.backend_app.products.DTOs.EditProductDTO;
import com.example.backend_app.products.DTOs.EditProductVariationDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import com.example.backend_app.products.services.ProductService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductVariationRepository productVariationRepository;



    @Test
    void testCreateProduct() throws ExceptionBadRequest {
        CreateProductDTO productDTO = new CreateProductDTO();
        productDTO.setName("honey");
        productDTO.setCategory(1L);
        productDTO.setDescription("description");
        productDTO.setImageUrl("test-image.jpg");
        productDTO.setSize("1000g");
        productDTO.setBasePrice(100.0);
        productDTO.setDiscount(10);
        productDTO.setIn_stock(true);

        Product createdProduct = productService.createProduct(productDTO);

        assertThat(createdProduct, notNullValue());
        assertThat(createdProduct.getName(), is("honey"));
        assertThat(createdProduct.getVariations(), hasSize(1));
        assertThat(createdProduct.getDescription(),is("description"));
        ProductVariation createdVariation = createdProduct.getVariations().get(0);
        assertThat(createdVariation.getImageUrl(), is("test-image.jpg"));
        assertThat(createdVariation.getSize(), is("1000g"));
        assertThat(createdVariation.getPrice(), is(createdVariation.getBasePrice()*(1-createdVariation.getDiscount()/100)));
    }

    @Test
    void testEditProduct(){
        ProductCategory testCategory = new ProductCategory();
        testCategory.setName("Test Category");
        testCategory = productCategoryRepository.save(testCategory);

        Product product = new Product();
        product.setName("Test Product");
        product.setDescription("Product Description");
        product.setCategory(testCategory);
        product = productRepository.save(product);
        testCategory.getProducts().add(product);

        ProductVariation productVariation = new ProductVariation();
        productVariation.setSize("1000g");
        productVariation.setBasePrice(100.0);
        productVariation.setDiscount(10);
        productVariation.setPrice(90.0);
        productVariation.setIn_stock(true);
        productVariation.setProduct(product);
        productVariation.setImageUrl("imageurl");
        productVariation = productVariationRepository.save(productVariation);

        product.getVariations().add(productVariation);

        String newSize="500g";
        Integer newDiscount=20;
        boolean newInStock=false;

        EditProductVariationDTO editProductVariationDTO = new EditProductVariationDTO(productVariation.getId(),newSize,productVariation.getImageUrl(),
                productVariation.getBasePrice(),newDiscount,newInStock);
        EditProductDTO editProductDTO = new EditProductDTO(testCategory.getId(),product.getName(),product.getDescription(),editProductVariationDTO);



        Product editedProduct = productService.editProduct(product.getId(),editProductDTO);

        ProductVariation editedProductVariation = productVariationRepository.findById(productVariation.getId()).get();

        assertThat(editedProduct, notNullValue());
        assertThat(editedProductVariation.getDiscount(), is(newDiscount));
        assertThat(editedProductVariation.getSize(), is(newSize));
        assertThat(editedProductVariation.getIn_stock(), is(newInStock));



    }

    @Test
    void testDeleteProduct(){
        ProductCategory testCategory = new ProductCategory();
        testCategory.setName("Test Category");
        testCategory = productCategoryRepository.save(testCategory);

        Product product = new Product();
        product.setName("Test Product");
        product.setDescription("Product Description");
        product.setCategory(testCategory);
        product = productRepository.save(product);
        testCategory.getProducts().add(product);

        ProductVariation productVariation = new ProductVariation();
        productVariation.setSize("1000g");
        productVariation.setBasePrice(100.0);
        productVariation.setDiscount(10);
        productVariation.setPrice(90.0);
        productVariation.setIn_stock(true);
        productVariation.setProduct(product);
        productVariation.setImageUrl("imageurl");
        productVariation = productVariationRepository.save(productVariation);

        product.getVariations().add(productVariation);

        productService.deleteProduct(product.getId());
        Optional<Product> deletedProduct = productRepository.findById(product.getId());
        assertFalse(deletedProduct.isPresent(), "Product should be deleted");
    }

    @Test
    void testGetAllProducts() {
        ProductCategory testCategory = new ProductCategory();
        testCategory.setName("Test Category");
        testCategory = productCategoryRepository.save(testCategory);

        int page = 0;
        int pageSize = 10;
        List<Long> categoryIds = List.of(testCategory.getId());
        String searchName = "Test";


        Product product1 = new Product();
        product1.setName("Test Product");
        product1.setDescription("Product Description");
        product1.setCategory(testCategory);
        product1 = productRepository.save(product1);
        testCategory.getProducts().add(product1);
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Test Product");
        product2.setDescription("Product Description");
        product2.setCategory(testCategory);
        product2 = productRepository.save(product2);
        testCategory.getProducts().add(product2);
        productRepository.save(product2);

        Page<Product> productsPage = productService.getAllProducts(page, pageSize, categoryIds, searchName);

        assertNotNull(productsPage);
        assertTrue(!productsPage.getContent().isEmpty());
        assertEquals(2, productsPage.getTotalElements());
    }

}
