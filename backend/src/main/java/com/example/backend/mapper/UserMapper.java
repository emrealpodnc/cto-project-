package com.example.backend.mapper;

import org.springframework.stereotype.Component;

import com.example.backend.dto.request.UserRequestDTO;
import com.example.backend.dto.response.UserResponseDTO;
import com.example.backend.entity.User;

@Component
public class UserMapper {

    public User toEntity(UserRequestDTO dto) {

        User user = new User();

        user.setAdSoyad(dto.getAdSoyad());
        user.setSifre(dto.getSifre());
        user.setRol(dto.getRol());
        user.setKullaniciAdi(dto.getKullaniciAdi());
        return user;
    }

    public UserResponseDTO toResponse(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setAdSoyad(user.getAdSoyad());
        dto.setRol(user.getRol());
        dto.setAktifMi(user.getAktifMi());
        dto.setOlusturmaTarihi(user.getOlusturmaTarihi());
        dto.setKullaniciAdi(user.getKullaniciAdi());
        return dto;
    }

}