package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.request.UserRequestDTO;
import com.example.backend.dto.request.UserUpdateRequestDTO;
import com.example.backend.dto.response.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import org.springframework.util.StringUtils;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO kullaniciKaydet(UserRequestDTO dto) {

        if (userRepository.existsByKullaniciAdi(dto.getKullaniciAdi())) {
            throw new RuntimeException("Bu kullanıcı adı zaten kullanılıyor.");
        }

        User user = userMapper.toEntity(dto);

        user.setSifre(passwordEncoder.encode(dto.getSifre()));

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }

    public List<UserResponseDTO> tumKullanicilariGetir() {

        return userRepository.findAllByOrderByAdSoyadAsc()
                .stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    public UserResponseDTO kullaniciGetir(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));

        return userMapper.toResponse(user);
    }

    public UserResponseDTO kullaniciGuncelle(Long id, UserUpdateRequestDTO dto) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));

        if (!user.getKullaniciAdi().equals(dto.getKullaniciAdi())
                && userRepository.existsByKullaniciAdi(dto.getKullaniciAdi())) {

            throw new RuntimeException("Bu kullanıcı adı zaten kullanılıyor.");
        }

        user.setAdSoyad(dto.getAdSoyad());
        user.setKullaniciAdi(dto.getKullaniciAdi());
        user.setRol(dto.getRol());
        if (dto.getAktifMi() != null) {
    user.setAktifMi(dto.getAktifMi());
}

        if (StringUtils.hasText(dto.getSifre())) {
            user.setSifre(passwordEncoder.encode(dto.getSifre()));
        }

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }

    public void kullaniciPasifYap(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));

        user.setAktifMi(false);

        userRepository.save(user);
    }

}
