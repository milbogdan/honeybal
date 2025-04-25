package com.example.backend_app.global.seed;

import com.example.backend_app.orders.repositories.DeliveryTypesRepository;
import com.example.backend_app.orders.repositories.OrderRepository;
import com.example.backend_app.products.models.Wishlist;
import com.example.backend_app.products.repositories.ProductCategoryRepository;
import com.example.backend_app.products.repositories.ProductRepository;
import com.example.backend_app.products.repositories.ProductVariationRepository;
import com.example.backend_app.products.repositories.WishlistRepository;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.backend_app.orders.models.DeliveryTypes;
import com.example.backend_app.orders.models.Order;
import com.example.backend_app.orders.models.OrderProduct;
import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import com.example.backend_app.products.models.ProductVariation;
import com.example.backend_app.user.models.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductVariationRepository productVariationRepository;
    private final OrderRepository orderRepository;
    private final DeliveryTypesRepository deliveryTypesRepository;
    private final WishlistRepository wishlistRepository;

    @Bean
    public CommandLineRunner seedData(PasswordEncoder passwordEncoder) {
        return args -> {
            boolean shouldSeed = userRepository.count() == 0 &&
                    productRepository.count() == 0 &&
                    productCategoryRepository.count() == 0 &&
                    productVariationRepository.count() == 0 &&
                    deliveryTypesRepository.count() == 0 &&
                    orderRepository.count() == 0;

            if (shouldSeed){
                // Delivery Types
                DeliveryTypes standard = new DeliveryTypes(null, "Standard");
                DeliveryTypes express = new DeliveryTypes(null, "Express");
                deliveryTypesRepository.saveAll(List.of(standard, express));

                //Product Category
                ProductCategory honeyCategory = new ProductCategory();
                honeyCategory.setName("Med");

                ProductCategory other = new ProductCategory();
                other.setName("Ostalo");

                productCategoryRepository.saveAll(List.of(honeyCategory, other));

                //Products
                List<Product> honeyProducts = List.of(
                        new Product(null, honeyCategory, "Livadski med", "Prirodni med sa livada Srbije", new ArrayList<>()),
                        new Product(null, honeyCategory, "Bagremov med", "Bagremov med iz netaknute prirode", new ArrayList<>()),
                        new Product(null, honeyCategory, "Sumski med", "Tamniji, jaci ukus meda iz suma", new ArrayList<>())
                );
                productRepository.saveAll(honeyProducts);

                for (Product product : honeyProducts) {
                    ProductVariation variation = new ProductVariation();
                    variation.setSize("500g");
                    variation.setImageUrl("/images/" + product.getName().toLowerCase().replace(" ", "_") + ".png");
                    variation.setBasePrice(1000.0);
                    variation.setPrice(850.0);
                    variation.setDiscount(15);
                    variation.setIn_stock(true);
                    variation.setProduct(product);
                    productVariationRepository.save(variation);
                }

                Product other1 = new Product(null, other, "Drvene kašičice", "Prirodne kašičice za konzumaciju meda", new ArrayList<>());
                Product other2 = new Product(null, other, "Motalice", "Motalice za zatvaranje tegli i bočica", new ArrayList<>());
                productRepository.saveAll(List.of(other1, other2));

                ProductVariation kasicica = new ProductVariation();
                kasicica.setSize("1 kom");
                kasicica.setImageUrl("/images/drvene_kasicice.png");
                kasicica.setBasePrice(150.0);
                kasicica.setPrice(150.0);
                kasicica.setDiscount(0);
                kasicica.setIn_stock(true);
                kasicica.setProduct(other1);
                productVariationRepository.save(kasicica);

                ProductVariation motalica = new ProductVariation();
                motalica.setSize("1 kom");
                motalica.setImageUrl("/images/motalice.png");
                motalica.setBasePrice(200.0);
                motalica.setPrice(180.0);
                motalica.setDiscount(10);
                motalica.setIn_stock(true);
                motalica.setProduct(other2);
                productVariationRepository.save(motalica);

                // drops
                ProductCategory dropsCategory = new ProductCategory();
                dropsCategory.setName("Kapi");
                productCategoryRepository.save(dropsCategory);

                Product drops1 = new Product(null, dropsCategory, "Propolis", "Prirodni propolis u kapima", new ArrayList<>());
                Product drops2 = new Product(null, dropsCategory, "Kapi za sinuse", "Kapi za olakšanje simptoma sinusa", new ArrayList<>());
                Product drops3 = new Product(null, dropsCategory, "Propolis kapi u spreju", "Praktične propolis kapi u spreju", new ArrayList<>());
                productRepository.saveAll(List.of(drops1, drops2, drops3));

                ProductVariation propolis = new ProductVariation();
                propolis.setSize("20ml");
                propolis.setImageUrl("/images/propolis.png");
                propolis.setBasePrice(700.0);
                propolis.setPrice(650.0);
                propolis.setDiscount(7);
                propolis.setIn_stock(true);
                propolis.setProduct(drops1);
                productVariationRepository.save(propolis);

                ProductVariation sinus = new ProductVariation();
                sinus.setSize("20ml");
                sinus.setImageUrl("/images/kapi_za_sinuse.png");
                sinus.setBasePrice(800.0);
                sinus.setPrice(720.0);
                sinus.setDiscount(10);
                sinus.setIn_stock(true);
                sinus.setProduct(drops2);
                productVariationRepository.save(sinus);

                ProductVariation sprej = new ProductVariation();
                sprej.setSize("20ml");
                sprej.setImageUrl("/images/propolis_kapi_u_spreju.png");
                sprej.setBasePrice(850.0);
                sprej.setPrice(790.0);
                sprej.setDiscount(7);
                sprej.setIn_stock(true);
                sprej.setProduct(drops3);
                productVariationRepository.save(sprej);



                //Users
                User john = new User();
                john.setUsername("john_doe");
                john.setEmail("john@example.com");
                john.setFirstName("John");
                john.setLastName("Doe");
                john.setAddress("123 Main St");
                john.setPassword(passwordEncoder.encode("password"));
                john.setRole(Role.ROLE_USER);
                john.setCreatedAt(new Date());
                john.setUpdatedAt(new Date());
                john.setIsVerified(true);
                userRepository.save(john);

                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setAddress("HQ Office");
                admin.setPassword(passwordEncoder.encode("password"));
                admin.setRole(Role.ROLE_ADMIN);
                admin.setCreatedAt(new Date());
                admin.setUpdatedAt(new Date());
                admin.setIsVerified(true);
                userRepository.save(admin);

                User ana = new User();
                ana.setUsername("ana_m");
                ana.setEmail("ana@example.com");
                ana.setFirstName("Ana");
                ana.setLastName("Matic");
                ana.setAddress("Ulica br. 45");
                ana.setPassword(passwordEncoder.encode("password"));
                ana.setRole(Role.ROLE_USER);
                ana.setCreatedAt(new Date());
                ana.setUpdatedAt(new Date());
                ana.setIsVerified(true);
                userRepository.save(ana);

                //Order for John
                ProductVariation firstVariation = productVariationRepository.findAll().get(0);
                Order order = new Order();
                order.setUser(john);
                order.setDelivery_type(standard);
                order.setAddress(john.getAddress());
                order.setComment("Please deliver ASAP");
                order.setEmail(john.getEmail());
                order.setPhoneNumber("1234567890");
                order.setPrice(firstVariation.getPrice());
                orderRepository.save(order);

                OrderProduct orderProduct = new OrderProduct();
                orderProduct.setOrder(order);
                orderProduct.setProductVariation(firstVariation);
                orderProduct.setQuantity(1);
                orderProduct.setPrice(firstVariation.getPrice());
                order.setOrderProducts(List.of(orderProduct));
                orderRepository.save(order);

                //wishlist john
                Wishlist wishlist1 = new Wishlist();
                wishlist1.setUser(john);
                wishlist1.setProductVariation(propolis);

                Wishlist wishlist2 = new Wishlist();
                wishlist2.setUser(john);
                wishlist2.setProductVariation(sprej);

                wishlistRepository.saveAll(List.of(wishlist1, wishlist2));

            }
        };
    }

}
