package com.example.backend_app.orders.models;

import com.example.backend_app.products.models.Product;
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
    private Order order;

    @JoinColumn(name="product_id")
    @ManyToOne
    private Product product;

    @Column
    private int quantity;

    @Column
    private int price;

}
