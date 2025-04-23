package com.example.backend_app.products.DTOs;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private ProductVariationDTO productVariation;
}
