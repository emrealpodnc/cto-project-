package com.example.backend.mapper;

import org.springframework.stereotype.Component;

import com.example.backend.dto.request.WeeklyReportRequestDTO;
import com.example.backend.dto.response.WeeklyReportResponseDTO;
import com.example.backend.entity.Project;
import com.example.backend.entity.WeeklyReport;

@Component
public class WeeklyReportMapper {

    public WeeklyReport toEntity(WeeklyReportRequestDTO dto, Project project) {

        WeeklyReport report = new WeeklyReport();

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

        return report;
    }

    public WeeklyReportResponseDTO toResponse(WeeklyReport report) {

        WeeklyReportResponseDTO dto = new WeeklyReportResponseDTO();

        dto.setId(report.getId());

        dto.setProjectId(report.getProject().getId());
        dto.setProjeAdi(report.getProject().getProjeAdi());

        dto.setHaftaNo(report.getHaftaNo());
        dto.setRaporTarihi(report.getRaporTarihi());
        dto.setTamamlanmaYuzdesi(report.getTamamlanmaYuzdesi());
        dto.setBuHaftaYapilanlar(report.getBuHaftaYapilanlar());
        dto.setDevamEdenIsler(report.getDevamEdenIsler());
        dto.setRiskler(report.getRiskler());
        dto.setEngeller(report.getEngeller());
        dto.setGelecekHaftaPlani(report.getGelecekHaftaPlani());
        dto.setGenelNot(report.getGenelNot());

        return dto;
    }

}