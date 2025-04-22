package com.example.backend_app.auth.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class CurrentUserUtil {

    public static UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return (UserDetails) authentication.getPrincipal();
    }

    public static String getCurrentUsername() {
        UserDetails userDetails = getCurrentUser();
        return userDetails != null ? userDetails.getUsername() : null;
    }
}
