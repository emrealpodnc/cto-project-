package com.example.backend.dto.request;

import com.example.backend.enums.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDTO {

    @NotBlank(message = "Ad Soyad boş bırakılamaz.")
    private String adSoyad;

    @NotBlank(message = "Kullanıcı adı boş bırakılamaz.")
    private String kullaniciAdi;

    /*
     * Şifre güncellemede isteğe bağlıdır. null veya boş gelirse mevcut parola
     * korunur; yalnızca dolu bir değer geldiğinde parola değiştirilir.
     */
    private String sifre;

    @NotNull(message = "Rol boş bırakılamaz.")
    private Role rol;

    @NotNull(message = "Kullanıcı durumu boş bırakılamaz.")
    private Boolean aktifMi;
}
