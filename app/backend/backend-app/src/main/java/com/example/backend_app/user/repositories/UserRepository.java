package com.example.backend_app.user.repositories;

import com.example.backend_app.user.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    User findByUsernameOrEmail(String username, String email);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE " +
            "(:nameSearch IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :nameSearch, '%')) OR " +
            " LOWER(u.lastName) LIKE LOWER(CONCAT('%', :nameSearch, '%')) OR " +
            " LOWER(u.address) LIKE LOWER(CONCAT('%', :nameSearch, '%')) OR " +
            " LOWER(u.username) LIKE LOWER(CONCAT('%', :nameSearch, '%')) OR " +
            " LOWER(u.email) LIKE LOWER(CONCAT('%', :nameSearch, '%'))) " +
            "AND (:isVerified IS NULL OR u.isVerified = :isVerified)")
    Page<User> findAllSearchAndFilters(String nameSearch,Pageable pageable,Boolean isVerified);


}
