package com.example.backend_app.orders.controllers;

import com.example.backend_app.orders.DTOs.MakeOrderDTO;
import com.example.backend_app.orders.models.Order;
import com.example.backend_app.orders.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders/")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/post")
    public ResponseEntity<Order> order(@RequestBody MakeOrderDTO order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.makeOrder(order));
    }
}
