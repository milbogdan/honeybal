package com.example.backend_app.products.DTOs;

import lombok.Data;

@Data
public class WishlistDTO {
    private Long id;
    private ProductDTO product;
}
