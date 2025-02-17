package com.example.backend_app.products.repositories;

import com.example.backend_app.products.models.Product;
import com.example.backend_app.products.models.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN p.variations v " +
            "WHERE (:nameSearch IS NULL OR p.name LIKE CONCAT('%', :nameSearch, '%')) " +
            "AND (:categoryId IS NULL OR p.category.id = :categoryId) " +
            "AND (:inStock IS NULL OR v.in_stock = :inStock)")
    Page<Product> findAllWithSearchAndPagination(Pageable pageable, @Param("categoryId") Integer categoryId, @Param("nameSearch") String nameSearch,@Param("inStock") Boolean inStock);

    @Query("SELECT p FROM Product p WHERE p.name = :name AND p.category = :category AND p.description = :description")
    Product findByNameCategoryAndDescription(String name, ProductCategory category, String description);
}
