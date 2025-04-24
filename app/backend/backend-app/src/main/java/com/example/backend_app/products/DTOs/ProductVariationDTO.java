package com.example.backend_app.products.DTOs;

import lombok.Data;

@Data
public class ProductVariationDTO {
    private int id;
    private String size;
    private String imageUrl;
    private Double basePrice;
    private Double price;
    private Integer discount;
    private Boolean in_stock;
}
