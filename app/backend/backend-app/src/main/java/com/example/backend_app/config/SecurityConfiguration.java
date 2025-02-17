package com.example.backend_app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        //user endpoints
                        .requestMatchers(HttpMethod.GET,"/api/users/get{id}").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/users/getAll").authenticated()

                        //product endpoints
                        .requestMatchers(HttpMethod.POST,"/api/products/post").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/products/getAll").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/products/put{id}").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/products/get{id}").permitAll()

                        //productCategories endpoints
                        .requestMatchers(HttpMethod.GET,"/api/productCategories/getAll").permitAll()
                        .requestMatchers(
                                "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .logout(logout -> logout.permitAll());

       http.authenticationProvider(authenticationProvider);
       http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


       http.cors();

       return http.build();
    }

}
