package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.request.UserRequestDTO;
import com.example.backend.dto.request.UserUpdateRequestDTO;
import com.example.backend.dto.response.UserResponseDTO;
import jakarta.validation.Valid;
import com.example.backend.service.UserService;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDTO kullaniciKaydet(@Valid @RequestBody UserRequestDTO dto) {
        return userService.kullaniciKaydet(dto);
    }

    public UserResponseDTO kullaniciKaydet(Authentication authentication, @Valid @RequestBody UserRequestDTO dto) {
        if (authentication == null || authentication.getAuthorities().stream()
                .noneMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Yalnızca admin kullanıcılar yeni kullanıcı ekleyebilir.");
        }

        return userService.kullaniciKaydet(dto);
    }

    @GetMapping
    public List<UserResponseDTO> tumKullanicilar() {
        return userService.tumKullanicilariGetir();
    }
    @GetMapping("/project-managers")
public List<UserResponseDTO> projeYoneticileriniGetir() {
    return userService.projeYoneticileriniGetir();
}
    @GetMapping("/{id}")
public UserResponseDTO kullaniciGetir(@PathVariable Long id) {
    return userService.kullaniciGetir(id);
}

@PutMapping("/{id}")
public UserResponseDTO kullaniciGuncelle(
        @PathVariable Long id,
        @Valid @RequestBody UserUpdateRequestDTO dto) {

    return userService.kullaniciGuncelle(id, dto);
}

@PatchMapping("/{id}/pasif")
public void kullaniciPasifYap(@PathVariable Long id) {
    userService.kullaniciPasifYap(id);
}
}
