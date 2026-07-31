package com.example.backend.dto.response;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeeklyReportResponseDTO {

    private Long id;

    private Long projectId;

    private String projeAdi;

    private Integer haftaNo;

    private LocalDate raporTarihi;

    private Integer tamamlanmaYuzdesi;

    private String buHaftaYapilanlar;

    private String devamEdenIsler;

    private String riskler;

    private String engeller;

    private String gelecekHaftaPlani;

    private String genelNot;

    private String olusturanKullanici;

}