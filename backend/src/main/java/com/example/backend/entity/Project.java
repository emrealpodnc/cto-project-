package com.example.backend.entity;

import com.example.backend.enums.Oncelik;
import com.example.backend.enums.ProjeDurumu;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Proje adı boş olamaz")
    @Size(min = 3, max = 100, message = "Proje adı 3 ile 100 karakter arasında olmalıdır")
    private String projeAdi;

    @NotNull(message = "Proje yöneticisi boş olamaz")
    @ManyToOne
    @JoinColumn(name = "proje_yoneticisi_id")
    private User projeYoneticisi;

    @NotNull(message = "Durum boş olamaz")
    @Enumerated(EnumType.STRING)
    private ProjeDurumu durum;

    private String aciklama;

    private Integer tamamlanmaYuzdesi;

    private LocalDate baslangicTarihi;

    private LocalDate bitisTarihi;

    private LocalDateTime olusturmaTarihi = LocalDateTime.now();
    @Enumerated(EnumType.STRING)
    private Oncelik oncelik;
}