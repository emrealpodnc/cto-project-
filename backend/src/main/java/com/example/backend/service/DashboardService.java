package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.dto.response.DashboardResponseDTO;
import com.example.backend.enums.ProjeDurumu;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.WeeklyReportRepository;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final WeeklyReportRepository weeklyReportRepository;

    public DashboardService(ProjectRepository projectRepository,
                            WeeklyReportRepository weeklyReportRepository) {

        this.projectRepository = projectRepository;
        this.weeklyReportRepository = weeklyReportRepository;
    }

    public DashboardResponseDTO dashboardBilgileri() {

        DashboardResponseDTO dto = new DashboardResponseDTO();

        dto.setToplamProje(projectRepository.count());

        dto.setDevamEdenProje(
                projectRepository.countByDurum(ProjeDurumu.DEVAM_EDIYOR));

        dto.setTamamlananProje(
                projectRepository.countByDurum(ProjeDurumu.TAMAMLANDI));

        dto.setToplamRapor(
                weeklyReportRepository.count());

        dto.setRiskliProje(0L);

        return dto;
    }

}