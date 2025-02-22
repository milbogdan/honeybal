package com.example.backend_app.orders.repositories;

import com.example.backend_app.orders.models.DeliveryTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryTypesRepository extends JpaRepository<DeliveryTypes, Long> {

}
