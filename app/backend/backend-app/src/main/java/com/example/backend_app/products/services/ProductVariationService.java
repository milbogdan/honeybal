package com.example.backend_app.products.services;

import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.orders.models.DeliveryTypes;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductVariationService {
    private final ProductVariationRepository productVariationRepository;

    public void deleteVariation(long id) {
        if(!productVariationRepository.existsById(id)) {
            throw new ExceptionNotFound("Variation not found");
        }
        productVariationRepository.deleteById(id);
    }

    public ProductVariation getById(Long productVariationId) {
        return productVariationRepository.findById(productVariationId).orElseThrow(()
                ->new ExceptionNotFound("Product variation not found!"));
    }
}
