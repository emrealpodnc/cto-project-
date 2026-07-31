package com.example.backend.entity;
import java.util.List;
import jakarta.persistence.*;
import com.example.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Ad Soyad boş bırakılamaz.")
    private String adSoyad;


    @NotBlank(message = "Şifre boş bırakılamaz.")
    private String sifre;

    @Enumerated(EnumType.STRING)
    private Role rol;

    private Boolean aktifMi = true;

    private LocalDateTime olusturmaTarihi = LocalDateTime.now();

    @OneToMany(mappedBy = "projeYoneticisi")
    private List<Project> projeler;

    @Column(unique = true)
    @NotBlank(message = "Kullanıcı adı boş olamaz.")
    private String kullaniciAdi;
}