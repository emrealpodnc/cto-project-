package com.example.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.request.LoginRequestDTO;
import com.example.backend.dto.request.UserRequestDTO;
import com.example.backend.dto.request.UserUpdateRequestDTO;
import com.example.backend.dto.response.LoginResponseDTO;
import com.example.backend.dto.response.UserResponseDTO;
import com.example.backend.enums.Role;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void contextLoads() {
    }

    @Test
    @Transactional
    void bcryptSifreKaydedilirGuncellenirVeLoginCalisir() {
        String kullaniciAdi = "bcrypt-test-" + System.nanoTime();
        String ilkSifre = "ilk-guvenli-parola";

        UserRequestDTO createRequest = new UserRequestDTO();
        createRequest.setAdSoyad("BCrypt Test Kullanıcısı");
        createRequest.setKullaniciAdi(kullaniciAdi);
        createRequest.setSifre(ilkSifre);
        createRequest.setRol(Role.ADMIN);
        createRequest.setAktifMi(true);

        UserResponseDTO response = userService.kullaniciKaydet(createRequest);

        userRepository.flush();
        entityManager.clear();

        String ilkHash = userRepository.findById(response.getId()).orElseThrow().getSifre();
        assertNotEquals(ilkSifre, ilkHash);
        assertTrue(passwordEncoder.matches(ilkSifre, ilkHash));

        LoginRequestDTO ilkLogin = new LoginRequestDTO();
        ilkLogin.setKullaniciAdi(kullaniciAdi);
        ilkLogin.setSifre(ilkSifre);
        assertTrue(authService.login(ilkLogin).getToken() != null);

        UserUpdateRequestDTO emptyPasswordUpdate = new UserUpdateRequestDTO();
        emptyPasswordUpdate.setAdSoyad("BCrypt Test Kullanıcısı");
        emptyPasswordUpdate.setKullaniciAdi(kullaniciAdi);
        emptyPasswordUpdate.setSifre("");
        emptyPasswordUpdate.setRol(Role.ADMIN);
        emptyPasswordUpdate.setAktifMi(true);
        userService.kullaniciGuncelle(response.getId(), emptyPasswordUpdate);

        userRepository.flush();
        entityManager.clear();

        String degismeyenHash = userRepository.findById(response.getId()).orElseThrow().getSifre();
        assertEquals(ilkHash, degismeyenHash);

        String yeniSifre = "yeni-guvenli-parola";
        emptyPasswordUpdate.setSifre(yeniSifre);
        userService.kullaniciGuncelle(response.getId(), emptyPasswordUpdate);

        userRepository.flush();
        entityManager.clear();

        String yeniHash = userRepository.findById(response.getId()).orElseThrow().getSifre();
        assertNotEquals(ilkHash, yeniHash);
        assertTrue(passwordEncoder.matches(yeniSifre, yeniHash));
        assertFalse(passwordEncoder.matches(ilkSifre, yeniHash));

        LoginRequestDTO yeniLogin = new LoginRequestDTO();
        yeniLogin.setKullaniciAdi(kullaniciAdi);
        yeniLogin.setSifre(yeniSifre);
        LoginResponseDTO loginResponse = authService.login(yeniLogin);
        assertTrue(loginResponse.getToken() != null && !loginResponse.getToken().isBlank());

        yeniLogin.setSifre(ilkSifre);
        assertThrows(BadCredentialsException.class, () -> authService.login(yeniLogin));
    }

    @Test
    @Transactional
    void farkliKullanicilarinParolalariKendiHashleriyleDogrulanir() {
        String benzersizEk = String.valueOf(System.nanoTime());
        String ilkKullaniciAdi = "ilk-bcrypt-" + benzersizEk;
        String ikinciKullaniciAdi = "ikinci-bcrypt-" + benzersizEk;
        String ilkSifre = "ilk-farkli-parola";
        String ikinciSifre = "ikinci-farkli-parola";

        UserRequestDTO ilkKullanici = new UserRequestDTO();
        ilkKullanici.setAdSoyad("İlk BCrypt Test Kullanıcısı");
        ilkKullanici.setKullaniciAdi(ilkKullaniciAdi);
        ilkKullanici.setSifre(ilkSifre);
        ilkKullanici.setRol(Role.ADMIN);
        ilkKullanici.setAktifMi(true);

        UserRequestDTO ikinciKullanici = new UserRequestDTO();
        ikinciKullanici.setAdSoyad("İkinci BCrypt Test Kullanıcısı");
        ikinciKullanici.setKullaniciAdi(ikinciKullaniciAdi);
        ikinciKullanici.setSifre(ikinciSifre);
        ikinciKullanici.setRol(Role.ADMIN);
        ikinciKullanici.setAktifMi(true);

        UserResponseDTO ilkKayit = userService.kullaniciKaydet(ilkKullanici);
        UserResponseDTO ikinciKayit = userService.kullaniciKaydet(ikinciKullanici);

        userRepository.flush();
        entityManager.clear();

        String ilkHash = userRepository.findById(ilkKayit.getId()).orElseThrow().getSifre();
        String ikinciHash = userRepository.findById(ikinciKayit.getId()).orElseThrow().getSifre();

        assertTrue(passwordEncoder.matches(ilkSifre, ilkHash));
        assertTrue(passwordEncoder.matches(ikinciSifre, ikinciHash));
        assertFalse(passwordEncoder.matches(ilkSifre, ikinciHash));
        assertFalse(passwordEncoder.matches(ikinciSifre, ilkHash));
    }
}
