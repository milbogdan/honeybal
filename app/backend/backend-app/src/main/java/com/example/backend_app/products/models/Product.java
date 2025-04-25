package com.example.backend_app.products.models;

import com.example.backend_app.products.DTOs.CreateProductDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@Table(name="products")
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    private ProductCategory category;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductVariation> variations = new ArrayList<>();



    public static Product fromDTO(CreateProductDTO createProductDTO, ProductCategory productCategory) {
        Product product = new Product();
        product.setName(createProductDTO.getName());
        product.setDescription(createProductDTO.getDescription());
        product.setCategory(productCategory);

        return product;
    }



}
