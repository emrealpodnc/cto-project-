package com.example.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

class CustomUserDetailsServiceTest {

    @Test
    void loadUserByUsername_shouldHandleNullRole() {
        UserRepository userRepository = mock(UserRepository.class);

        User user = new User();
        user.setKullaniciAdi("yeniKullanici");
        String storedHash = new BCryptPasswordEncoder().encode("plain-text-password");
        user.setSifre(storedHash);
        user.setRol(null);

        when(userRepository.findByKullaniciAdi("yeniKullanici"))
                .thenReturn(Optional.of(user));

        CustomUserDetailsService service = new CustomUserDetailsService(userRepository);

        UserDetails userDetails = service.loadUserByUsername("yeniKullanici");

        assertEquals("yeniKullanici", userDetails.getUsername());
        assertEquals(storedHash, userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_PROJECT_MANAGER")));
    }
}
