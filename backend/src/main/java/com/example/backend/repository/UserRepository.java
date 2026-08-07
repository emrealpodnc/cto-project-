package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.User;
import com.example.backend.enums.Role;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByKullaniciAdi(String kullaniciAdi);

    Optional<User> findByIdAndAktifMiTrue(Long id);

    boolean existsByKullaniciAdi(String kullaniciAdi);

    List<User> findAllByOrderByAdSoyadAsc();

    List<User> findByRolOrderByAdSoyadAsc(Role rol);

}