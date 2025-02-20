package com.example.backend_app.orders.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class MakeOrderDTO {
    private long deliveryTypeId;
    private String comment;
    private String phoneNumber;
    private String address;
    private String email;
    List<OrderVariationDTO> variations;
}
