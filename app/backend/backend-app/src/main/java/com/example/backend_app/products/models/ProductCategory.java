package com.example.backend_app.products.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="product_categories")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

}
