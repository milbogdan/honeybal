package com.example.backend_app.products.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="product_variations")
public class ProductVariation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Double basePrice;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer discount;

    @Column(nullable = false)
    private Boolean in_stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", nullable=false)
    @JsonIgnore
    private Product product;


}
