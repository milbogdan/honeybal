package com.example.backend_app.orders.services;

import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.orders.models.DeliveryTypes;
import com.example.backend_app.orders.repositories.DeliveryTypesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryTypesService {

    private final DeliveryTypesRepository deliveryTypesRepository;

    public DeliveryTypes getById(Long deliveryTypeId) {
        return deliveryTypesRepository.findById(deliveryTypeId).orElseThrow(()
                ->new ExceptionNotFound("Delivery type not found!"));
    }
}
