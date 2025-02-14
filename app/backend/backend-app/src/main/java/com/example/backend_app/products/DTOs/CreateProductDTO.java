package com.example.backend_app.products.DTOs;

import com.example.backend_app.products.models.ProductCategory;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProductDTO {
    private int category;
    private String name;
    private String description;
    private Boolean in_stock;
    private String imageUrl;
    private String size;
    private double basePrice;
    private int discount;
}
