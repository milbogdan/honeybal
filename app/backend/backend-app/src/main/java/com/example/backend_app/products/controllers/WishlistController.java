package com.example.backend_app.products.controllers;

import com.example.backend_app.global.DTOs.MessageResponse;
import com.example.backend_app.products.DTOs.WishlistDTO;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.models.Wishlist;
import com.example.backend_app.products.services.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @PostMapping("/post")
    public ResponseEntity<MessageResponse> addWishlist(@RequestParam Long productVariationId) {
        wishlistService.addToWishlist(productVariationId);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Product added to wishlist successfully!"));
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<WishlistDTO>> getAllWishlists(@RequestParam int page, @RequestParam int pageSize) {
        return ResponseEntity.status(HttpStatus.OK).body(wishlistService.getAllForUser(page,pageSize));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessageResponse> removeFromWishlist(@RequestParam Long wishlistId) {
        wishlistService.removeFromWishlist(wishlistId);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Removed from wishlist successfully!"));
    }

}
