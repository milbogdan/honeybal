package com.example.backend_app.products.DTOs;

import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.models.ProductVariation;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EditProductDTO {
    private Integer category;

    private String name;

    private String description;

    private EditProductVariationDTO variation;
}
