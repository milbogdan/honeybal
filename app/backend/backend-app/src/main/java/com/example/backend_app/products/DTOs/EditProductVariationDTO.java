package com.example.backend_app.products.DTOs;

import com.example.backend_app.products.models.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditProductVariationDTO {
    private Long id;
    private String size;
    private String imageUrl;
    private Double basePrice;
    private Integer discount;
    private Boolean in_stock;
}
