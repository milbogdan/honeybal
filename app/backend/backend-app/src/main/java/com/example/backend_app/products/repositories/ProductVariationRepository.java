package com.example.backend_app.products.repositories;

import com.example.backend_app.products.models.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Long> {

}
