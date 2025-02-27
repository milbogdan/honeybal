package com.example.backend_app.orders.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class OrderVariationDTO {
    private int quantity;
    private long productVariationId;
}
