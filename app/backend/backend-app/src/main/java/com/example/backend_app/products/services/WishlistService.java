package com.example.backend_app.products.services;

import com.example.backend_app.auth.services.CurrentUserUtil;
import com.example.backend_app.global.exception.ExceptionBadRequest;
import com.example.backend_app.global.exception.ExceptionForbidden;
import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.products.DTOs.WishlistDTO;
import com.example.backend_app.products.mappers.WishlistMapper;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.models.Wishlist;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import com.example.backend_app.products.repositories.WishlistRepository;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final ProductVariationRepository productVariationRepository;
    private final WishlistMapper wishlistMapper;

    public void addToWishlist(Long productVariationId) {
        User currentUser = CurrentUserUtil.getCurrentUser();
        ProductVariation productVariation = productVariationRepository.findById(productVariationId)
                .orElseThrow(()-> new ExceptionNotFound("Product variation not found."));

        boolean alreadyExists = wishlistRepository.existsByUserAndProductVariation(currentUser, productVariation);

        if (alreadyExists) {
            throw new ExceptionBadRequest("Already on wishlist.");
        }


        Wishlist wishlist = new Wishlist(null,currentUser,productVariation);
        wishlistRepository.save(wishlist);
    }

    public Page<WishlistDTO> getAllForUser(int page, int pageSize) {
        User currentUser = CurrentUserUtil.getCurrentUser();
        Pageable pageable = PageRequest.of(page,pageSize);

        Page<Wishlist> wishlists = wishlistRepository.findAllByUser(pageable,currentUser);

        List<WishlistDTO> wishlistDTOS  = new ArrayList<>();

        for (Wishlist wishlist : wishlists) {
            WishlistDTO wishlistDTO = wishlistMapper.toDTO(wishlist);
            wishlistDTOS.add(wishlistDTO);
        }




        return new PageImpl<>(wishlistDTOS, pageable, wishlists.getTotalElements());

    }

    public void removeFromWishlist(Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId).orElseThrow(()-> new ExceptionNotFound("Wishlist not found."));
        User currentUser = CurrentUserUtil.getCurrentUser();
        if(!currentUser.getId().equals(wishlist.getUser().getId())) {
            throw new ExceptionForbidden("You are not allowed to remove this Wishlist.");
        }
        wishlistRepository.delete(wishlist);
    }
}
