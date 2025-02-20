package com.example.backend_app.orders.controllers;

import com.example.backend_app.orders.DTOs.MakeOrderDTO;
import com.example.backend_app.orders.models.Order;
import com.example.backend_app.orders.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders/")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/post")
    public ResponseEntity<Order> order(@RequestBody MakeOrderDTO order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.makeOrder(order));
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Order>> getAllOrders(@RequestParam int page, @RequestParam int pageSize) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAll(page,pageSize));
    }
}
