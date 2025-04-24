package com.example.backend_app.products.mappers;


import com.example.backend_app.products.DTOs.WishlistDTO;
import com.example.backend_app.products.models.Wishlist;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface WishlistMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "productVariation.product.name", target = "product.name")
    @Mapping(source = "productVariation.product.description", target = "product.description")
    @Mapping(source = "productVariation.id", target = "product.productVariation.id")
    @Mapping(source = "productVariation.size", target = "product.productVariation.size")
    @Mapping(source = "productVariation.imageUrl", target = "product.productVariation.imageUrl")
    @Mapping(source = "productVariation.basePrice", target = "product.productVariation.basePrice")
    @Mapping(source = "productVariation.price", target = "product.productVariation.price")
    @Mapping(source = "productVariation.discount", target = "product.productVariation.discount")
    @Mapping(source = "productVariation.in_stock", target = "product.productVariation.in_stock")
    WishlistDTO toDTO(Wishlist wishlist);

}
