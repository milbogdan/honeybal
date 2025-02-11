package com.example.backend_app.orders.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="delivery_types")
public class DeliveryTypes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}