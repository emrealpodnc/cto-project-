package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {

    private String token;

    private String kullaniciAdi;

    private String rol;

    private Long kullaniciId;
}