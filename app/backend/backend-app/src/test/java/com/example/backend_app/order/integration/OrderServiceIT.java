package com.example.backend_app.order.integration;

import com.example.backend_app.orders.DTOs.MakeOrderDTO;
import com.example.backend_app.orders.DTOs.OrderVariationDTO;
import com.example.backend_app.orders.models.DeliveryTypes;
import com.example.backend_app.orders.models.Order;
import com.example.backend_app.orders.repositories.DeliveryTypesRepository;
import com.example.backend_app.orders.services.OrderService;
import com.example.backend_app.products.DTOs.EditProductVariationDTO;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class OrderServiceIT {

    @Autowired
    private ProductVariationRepository productVariationRepository;
    @Autowired
    private ProductCategoryRepository productCategoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private DeliveryTypesRepository deliveryTypesRepository;

    @WithMockUser(username = "test@example.com")
    @Test
    void testMakeOrder(){
        DeliveryTypes deliveryType = new DeliveryTypes();
        deliveryType.setName("Test delivery type");

        ProductCategory testCategory = new ProductCategory();
        testCategory.setName("Test Category");
        testCategory = productCategoryRepository.save(testCategory);

        Product product = new Product();
        product.setName("Test Product");
        product.setDescription("Product Description");
        product.setCategory(testCategory);
        product = productRepository.save(product);
        testCategory.getProducts().add(product);

        ProductVariation productVariation = new ProductVariation();
        productVariation.setSize("1000g");
        productVariation.setBasePrice(100.0);
        productVariation.setDiscount(10);
        productVariation.setPrice(90.0);
        productVariation.setIn_stock(true);
        productVariation.setProduct(product);
        productVariation.setImageUrl("imageurl");
        productVariation = productVariationRepository.save(productVariation);
        product.getVariations().add(productVariation);

        deliveryTypesRepository.save(deliveryType);

        MakeOrderDTO makeOrderDTO = new MakeOrderDTO();
        makeOrderDTO.setAddress("Test address");
        makeOrderDTO.setComment("Test comment");
        makeOrderDTO.setPhoneNumber("Test phone number");
        makeOrderDTO.setDeliveryTypeId(deliveryType.getId());
        makeOrderDTO.setEmail("Test email");

        OrderVariationDTO variationToOrder = new OrderVariationDTO();
        variationToOrder.setQuantity(1);
        variationToOrder.setProductVariationId(productVariation.getId());
        List<OrderVariationDTO> variations = new ArrayList<>();
        variations.add(variationToOrder);
        makeOrderDTO.setVariations(variations);

        Order madeOrder = orderService.makeOrder(makeOrderDTO);

        assertNotNull(madeOrder);
        assertEquals(makeOrderDTO.getAddress(), madeOrder.getAddress());
        assertEquals(makeOrderDTO.getPhoneNumber(), madeOrder.getPhoneNumber());


    }

}
