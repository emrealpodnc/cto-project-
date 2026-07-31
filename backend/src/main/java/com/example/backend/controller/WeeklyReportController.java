package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.request.WeeklyReportRequestDTO;
import com.example.backend.dto.response.WeeklyReportResponseDTO;
import com.example.backend.service.WeeklyReportService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/weekly-reports")
public class WeeklyReportController {

    private final WeeklyReportService weeklyReportService;

    public WeeklyReportController(WeeklyReportService weeklyReportService) {
        this.weeklyReportService = weeklyReportService;
    }

    @GetMapping
    public List<WeeklyReportResponseDTO> tumRaporlariGetir() {
        return weeklyReportService.tumRaporlariGetir();
    }

    @GetMapping("/{id}")
    public WeeklyReportResponseDTO raporGetir(@PathVariable Long id) {
        return weeklyReportService.raporGetir(id);
    }

    @PostMapping
    public WeeklyReportResponseDTO raporKaydet(
            @Valid @RequestBody WeeklyReportRequestDTO dto) {

        return weeklyReportService.raporKaydet(dto);
    }

    @PutMapping("/{id}")
    public WeeklyReportResponseDTO raporGuncelle(
            @PathVariable Long id,
            @Valid @RequestBody WeeklyReportRequestDTO dto) {

        return weeklyReportService.raporGuncelle(id, dto);
    }

    @DeleteMapping("/{id}")
    public void raporSil(@PathVariable Long id) {
        weeklyReportService.raporSil(id);
    }
}