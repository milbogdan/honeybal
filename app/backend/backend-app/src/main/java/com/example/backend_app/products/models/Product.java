package com.example.backend_app.products.models;

import com.example.backend_app.products.DTOs.CreateProductDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Optional;

@Data
@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    private ProductCategory category;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean in_stock;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = true)
    private String size;

    @Column(nullable = false)
    private double basePrice;

    @Column(nullable = false)
    private int discount;

    @Column(nullable = false)
    private double price;

    public static Product fromDTO(CreateProductDTO createProductDTO, ProductCategory productCategory) {
        Product product = new Product();
        product.setName(createProductDTO.getName());
        product.setDescription(createProductDTO.getDescription());
        product.setImageUrl(createProductDTO.getImageUrl());
        product.setSize(createProductDTO.getSize());
        product.setBasePrice(createProductDTO.getBasePrice());
        product.setDiscount(createProductDTO.getDiscount());
        product.setIn_stock(createProductDTO.getIn_stock());
        product.setCategory(productCategory);

        product.calculatePrice();

        return product;
    }

    public void calculatePrice() {
        this.price = this.basePrice * (1 - this.discount / 100.0);
    }

}
