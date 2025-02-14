package com.example.backend_app.products.DTOs;

import com.example.backend_app.products.models.ProductCategory;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditProductDTO {
    private Integer category;

    private String name;

    private String description;

    private Boolean in_stock;

    private String imageUrl;

    private String size;

    private Double basePrice;

    private Integer discount;

}
