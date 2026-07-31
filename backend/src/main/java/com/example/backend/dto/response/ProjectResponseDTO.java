package com.example.backend.dto.response;

import java.time.LocalDate;

import com.example.backend.enums.Oncelik;
import com.example.backend.enums.ProjeDurumu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponseDTO {

    private Long id;

    private String projeAdi;

    private String aciklama;

    private ProjeDurumu durum;

    private Oncelik oncelik;

    private String projeYoneticisi;

    private Long projeYoneticisiId;

    private Integer tamamlanmaYuzdesi;

    private LocalDate baslangicTarihi;

    private LocalDate bitisTarihi;
}