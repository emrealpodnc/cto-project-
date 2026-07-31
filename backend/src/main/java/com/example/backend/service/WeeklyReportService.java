package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.dto.request.WeeklyReportRequestDTO;
import com.example.backend.dto.response.WeeklyReportResponseDTO;
import com.example.backend.entity.Project;
import com.example.backend.entity.WeeklyReport;
import com.example.backend.mapper.WeeklyReportMapper;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.WeeklyReportRepository;

@Service
public class WeeklyReportService {

    private final WeeklyReportRepository weeklyReportRepository;
    private final ProjectRepository projectRepository;
    private final WeeklyReportMapper weeklyReportMapper;

    public WeeklyReportService(
            WeeklyReportRepository weeklyReportRepository,
            ProjectRepository projectRepository,
            WeeklyReportMapper weeklyReportMapper) {

        this.weeklyReportRepository = weeklyReportRepository;
        this.projectRepository = projectRepository;
        this.weeklyReportMapper = weeklyReportMapper;
    }

    public WeeklyReportResponseDTO raporKaydet(WeeklyReportRequestDTO dto) {

        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

        WeeklyReport report = weeklyReportMapper.toEntity(dto, project);

        report = weeklyReportRepository.save(report);

        return weeklyReportMapper.toResponse(report);
    }

    public List<WeeklyReportResponseDTO> tumRaporlariGetir() {

        return weeklyReportRepository.findAllByOrderByRaporTarihiDesc()
                .stream()
                .map(weeklyReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    public WeeklyReportResponseDTO raporGetir(Long id) {

        WeeklyReport report = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haftalık rapor bulunamadı."));

        return weeklyReportMapper.toResponse(report);
    }

    public WeeklyReportResponseDTO raporGuncelle(Long id, WeeklyReportRequestDTO dto) {

        WeeklyReport report = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haftalık rapor bulunamadı."));

        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

        report.setProject(project);
        report.setHaftaNo(dto.getHaftaNo());
        report.setRaporTarihi(dto.getRaporTarihi());
        report.setTamamlanmaYuzdesi(dto.getTamamlanmaYuzdesi());
        report.setBuHaftaYapilanlar(dto.getBuHaftaYapilanlar());
        report.setDevamEdenIsler(dto.getDevamEdenIsler());
        report.setRiskler(dto.getRiskler());
        report.setEngeller(dto.getEngeller());
        report.setGelecekHaftaPlani(dto.getGelecekHaftaPlani());
        report.setGenelNot(dto.getGenelNot());

        report = weeklyReportRepository.save(report);

        return weeklyReportMapper.toResponse(report);
    }

    public void raporSil(Long id) {

        WeeklyReport report = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haftalık rapor bulunamadı."));

        weeklyReportRepository.delete(report);
    }

}