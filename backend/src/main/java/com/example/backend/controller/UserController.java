package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.request.UserRequestDTO;
import com.example.backend.dto.request.UserUpdateRequestDTO;
import com.example.backend.dto.response.UserResponseDTO;

import jakarta.validation.Valid;
import com.example.backend.service.UserService;

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

    @GetMapping
    public List<UserResponseDTO> tumKullanicilar() {
        return userService.tumKullanicilariGetir();
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
