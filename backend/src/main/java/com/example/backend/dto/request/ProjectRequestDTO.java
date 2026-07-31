package com.example.backend.dto.request;

import java.time.LocalDate;

import com.example.backend.enums.Oncelik;
import com.example.backend.enums.ProjeDurumu;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequestDTO {

    @NotBlank
    private String projeAdi;

    private String aciklama;

    @NotNull
    private ProjeDurumu durum;

    @NotNull
    private Oncelik oncelik;

@NotNull
private Long projeYoneticisiId;

    private Integer tamamlanmaYuzdesi;

private LocalDate baslangicTarihi;

private LocalDate bitisTarihi;

}