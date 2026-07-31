package com.example.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank(message = "Kullanıcı adı boş bırakılamaz.")
    private String kullaniciAdi;

    @NotBlank(message = "Şifre boş bırakılamaz.")
    private String sifre;

}