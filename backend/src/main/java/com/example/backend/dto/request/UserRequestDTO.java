package com.example.backend.dto.request;

import com.example.backend.enums.Role;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {

    @NotBlank(message = "Ad Soyad boş bırakılamaz.")
    private String adSoyad;

    @NotBlank(message = "Kullanıcı adı boş bırakılamaz.")
    private String kullaniciAdi;

    @NotBlank(message = "Şifre boş bırakılamaz.")
    private String sifre;

    private Role rol;

    private Boolean aktifMi;

}