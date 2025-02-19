package com.example.backend_app.products.controllers;

import com.example.backend_app.global.DTOs.MessageResponse;
import com.example.backend_app.products.services.ProductVariationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productVariations")
public class ProductVariationController {

    private final ProductVariationService productVariationService;

    public ProductVariationController(ProductVariationService productVariationService) {
        this.productVariationService = productVariationService;
    }

    @DeleteMapping("/delete{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> delete(@PathVariable long id) {
        productVariationService.deleteVariation(id);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Product variation successfully deleted!"));
    }
}
