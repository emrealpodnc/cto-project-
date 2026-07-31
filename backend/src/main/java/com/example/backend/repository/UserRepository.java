package com.example.backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByKullaniciAdi(String kullaniciAdi);
    Optional<User> findByIdAndAktifMiTrue(Long id);
boolean existsByKullaniciAdi(String kullaniciAdi);

List<User> findAllByOrderByAdSoyadAsc();

}