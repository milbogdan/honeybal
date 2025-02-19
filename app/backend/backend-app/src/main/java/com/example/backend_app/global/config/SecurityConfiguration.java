package com.example.backend_app.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                        .requestMatchers(HttpMethod.GET,"/api/users/get/{id}").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/users/getAll").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/users/put/{id}").authenticated()

                        //product endpoints
                        .requestMatchers(HttpMethod.POST,"/api/products/post").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/products/getAll").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/products/put/{id}").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/products/get/{id}").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/api/products/delete/{id}").authenticated()

                        //productCategory endpoints
                        .requestMatchers(HttpMethod.GET,"/api/productCategories/getAll").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/api/productCategories/delete/{id}").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/productCategories/post").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/productCategories/put/{id}").authenticated()

                        //productVariation endpoints
                        .requestMatchers(HttpMethod.DELETE,"/api/productVariations/delete/{id}").authenticated()


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
