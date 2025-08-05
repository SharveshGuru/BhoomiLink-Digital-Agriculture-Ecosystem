package com.bhoomilink.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bhoomilink.backend.security.JwtAuthenticationFilter;
import com.bhoomilink.backend.service.UserService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    @Lazy
    UserService service;
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public UserDetailsService userDetailsService(){
        return username->{
            var user = service.getUserByUsername(username);

            if(user==null){
                throw new UsernameNotFoundException("User not Found!");
            }
            return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .roles(user.getUserType())
            .build();
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception{
        return ac.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/auth/**").permitAll() // Allow public access to /auth/** endpoints
                .anyRequest().authenticated() // Require authentication for all other endpoints
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter before UsernamePasswordAuthenticationFilter
    
        return http.build();
    }
    

    // @Bean
    // public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     CorsConfiguration config = new CorsConfiguration();
    //     config.setAllowCredentials(true);
    //     config.addAllowedOrigin(frontendUrl);  // Allow your frontend's URL
    //     config.addAllowedHeader("*");  // Allow all headers
    //     config.addAllowedMethod("*");  // Allow all HTTP methods (GET, POST, etc.)
    //     source.registerCorsConfiguration("/**", config);  // Apply CORS configuration to all endpoints
    //     return source;
    // }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");  
        config.addAllowedHeader("*");  
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }


}