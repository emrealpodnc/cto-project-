package com.example.backend.dto.response;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpcomingDeadlineResponseDTO {

    private Long id;

    private String projeAdi;

    private LocalDate bitisTarihi;

    private String durum;

    private Long kalanGun;
}