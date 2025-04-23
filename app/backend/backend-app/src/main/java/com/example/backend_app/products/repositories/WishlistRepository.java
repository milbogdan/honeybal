package com.example.backend_app.products.repositories;

import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.models.Wishlist;
import com.example.backend_app.user.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    public boolean existsByUserAndProductVariation(User user, ProductVariation productVariation);

    Page<Wishlist> findAllByUser(Pageable pageable, User currentUser);
}
