package com.example.backend.service;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "ctoTakipSistemiSuperSecretKey2026SpringSecurityJwt123456";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Token oluştur
    public String generateToken(String kullaniciAdi) {

        return Jwts.builder()
                .subject(kullaniciAdi)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(key)
                .compact();
    }

    // Kullanıcı adını al
    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }

    // Token geçerli mi?
    public boolean isTokenValid(String token, String kullaniciAdi) {

        return extractUsername(token).equals(kullaniciAdi)
                && !extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}