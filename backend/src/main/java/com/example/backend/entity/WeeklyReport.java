package com.example.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "weekly_reports")
public class WeeklyReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hangi projeye ait olduğu
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @NotNull(message = "Proje seçilmelidir.")
    private Project project;

    // Kaçıncı hafta raporu
    @NotNull(message = "Hafta numarası boş olamaz.")
    private Integer haftaNo;

    // Rapor tarihi
    @NotNull(message = "Rapor tarihi boş olamaz.")
    private LocalDate raporTarihi;

    // O hafta gerçekleşen ilerleme
    @Min(value = 0, message = "0'dan küçük olamaz.")
    @Max(value = 100, message = "100'den büyük olamaz.")
    private Integer tamamlanmaYuzdesi;

    // Bu hafta tamamlanan işler
    @NotBlank(message = "Bu hafta yapılanlar boş bırakılamaz.")
    @Column(columnDefinition = "TEXT")
    private String buHaftaYapilanlar;

    // Devam eden işler
    @Column(columnDefinition = "TEXT")
    private String devamEdenIsler;

    // Riskler
    @Column(columnDefinition = "TEXT")
    private String riskler;

    // Engeller
    @Column(columnDefinition = "TEXT")
    private String engeller;

    // Gelecek hafta planı
    @NotBlank(message = "Gelecek hafta planı boş bırakılamaz.")
    @Column(columnDefinition = "TEXT")
    private String gelecekHaftaPlani;

    // Genel not
    @Column(columnDefinition = "TEXT")
    private String genelNot;
   
}