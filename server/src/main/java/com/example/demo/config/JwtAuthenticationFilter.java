package com.example.demo.config;

import com.example.demo.service.auth.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.context.annotation.Lazy;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, @Lazy UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String jwt = null;
        final String authHeader = request.getHeader("Authorization");
        
        System.out.println("JWT Filter: processing " + request.getMethod() + " " + request.getRequestURI());

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            System.out.println("JWT Filter: Token found in Authorization header");
        } else if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("authToken".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    System.out.println("JWT Filter: Token found in Cookie");
                    break;
                }
            }
        }

        if (jwt == null) {
            System.out.println("JWT Filter: No token found in request");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String userEmail = jwtService.extractUsername(jwt);
            System.out.println("JWT Filter: extracted subject = " + userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                System.out.println("JWT Filter: User found in DB: " + userDetails.getUsername());

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("JWT Filter: User authenticated successfully");
                } else {
                    System.out.println("JWT Filter: Token invalid for user " + userDetails.getUsername());
                }
            }
        } catch (Exception e) {
            System.err.println("JWT Filter: Error during token validation: " + e.getMessage());
        }
        
        filterChain.doFilter(request, response);
    }
}
