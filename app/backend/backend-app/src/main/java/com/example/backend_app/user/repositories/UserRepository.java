package com.example.backend_app.user.repositories;

import com.example.backend_app.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    User findByUsernameOrEmail(String username, String email);
    Optional<User> findByEmail(String email);

}
