package com.example.backend_app.orders.models;

import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductVariation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="order_products")
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name="order_id")
    @ManyToOne
    @JsonIgnore
    private Order order;

    @JoinColumn(name="product_variation_id")
    @ManyToOne
    private ProductVariation productVariation;

    @Column
    private int quantity;

    @Column
    private double price;

}
