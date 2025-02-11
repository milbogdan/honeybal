package com.example.backend_app.products.models;

import jakarta.persistence.*;
import lombok.Data;

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
    private int basePrice;

    @Column(nullable = false)
    private int discount;

    @Column(nullable = false)
    private int price;
}
