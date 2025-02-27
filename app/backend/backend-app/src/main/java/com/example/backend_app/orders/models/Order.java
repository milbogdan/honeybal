package com.example.backend_app.orders.models;

import com.example.backend_app.user.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id",nullable = true)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name="delivery_type_id",nullable = false)
    private DeliveryTypes delivery_type;

    @Column(nullable = false)
    private double price;

    @Column(nullable = true)
    private String comment;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = true)
    private String email;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderProduct> orderProducts;

}
