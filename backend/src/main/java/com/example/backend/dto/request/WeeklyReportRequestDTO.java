package com.example.backend.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeeklyReportRequestDTO {

    @NotNull(message = "Proje seçilmelidir.")
    private Long projectId;

    @NotNull(message = "Hafta numarası boş bırakılamaz.")
    private Integer haftaNo;

    @NotNull(message = "Rapor tarihi boş bırakılamaz.")
    private LocalDate raporTarihi;

    @Min(value = 0, message = "0'dan küçük olamaz.")
    @Max(value = 100, message = "100'den büyük olamaz.")
    private Integer tamamlanmaYuzdesi;

    @NotBlank(message = "Bu hafta yapılanlar boş bırakılamaz.")
    private String buHaftaYapilanlar;

    private String devamEdenIsler;

    private String riskler;

    private String engeller;

    @NotBlank(message = "Gelecek hafta planı boş bırakılamaz.")
    private String gelecekHaftaPlani;

    private String genelNot;

}