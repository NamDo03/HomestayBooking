package com.HomestayBooking.HomestayBooking.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.function.Function;

public interface JWTService {
    String generateToken(UserDetails userDetails);
    String extractUserName(String token);
    <T> T extractClaim(String token, Function<Claims, T> claimsResolvers);
    Key getSigninKey();
    Claims extractAllClaims(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    boolean isTokenExpired(String token);
}
