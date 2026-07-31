package com.example.backend.dto.response;

import java.time.LocalDateTime;

import com.example.backend.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {

    private Long id;

    private String adSoyad;

    private String kullaniciAdi;

    private Role rol;

    private Boolean aktifMi;

    private LocalDateTime olusturmaTarihi;


}