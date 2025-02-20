package com.example.backend_app.orders.services;
import com.example.backend_app.global.exception.ExceptionBadRequest;
import com.example.backend_app.global.exception.ExceptionUnauthorized;
import com.example.backend_app.orders.DTOs.MakeOrderDTO;
import com.example.backend_app.orders.DTOs.OrderVariationDTO;
import com.example.backend_app.orders.models.Order;
import com.example.backend_app.orders.models.OrderProduct;
import com.example.backend_app.orders.repositories.OrderRepository;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.services.ProductVariationService;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final DeliveryTypesService deliveryTypesService;
    private final ProductVariationService productVariationService;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;


    public Order makeOrder(MakeOrderDTO madeOrder) {
        if(!StringUtils.hasText(madeOrder.getAddress())) throw new ExceptionBadRequest("Address is empty");
        if(!StringUtils.hasText(madeOrder.getPhoneNumber())) throw new ExceptionBadRequest("Phone number is empty");

        Order order = new Order();
        order.setDelivery_type(deliveryTypesService.getById(madeOrder.getDeliveryTypeId()));
        order.setAddress(madeOrder.getAddress());
        order.setComment(madeOrder.getComment());
        order.setPhoneNumber(madeOrder.getPhoneNumber());
        order.setEmail(madeOrder.getEmail());

        Object currentUserObject = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUserObject instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) currentUserObject;
            User currentUser=userRepository.findByEmail(userDetails.getUsername()).orElse(null);
            order.setUser(currentUser);
        }
        else{
            order.setUser(null);
        }


        double totalPrice=0.0;

        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderVariationDTO variation : madeOrder.getVariations()) {
            OrderProduct orderProduct = new OrderProduct();
            ProductVariation productVariation = productVariationService.getById(variation.getProductVariationId());

            orderProduct.setQuantity(variation.getQuantity());
            orderProduct.setOrder(order);
            orderProduct.setProductVariation(productVariation);
            orderProduct.setPrice(variation.getQuantity()*productVariation.getPrice());

            orderProducts.add(orderProduct);

            totalPrice+=orderProduct.getPrice();

        };
        order.setPrice(totalPrice);
        order.setOrderProducts(orderProducts);
        return orderRepository.save(order);
    }
}
