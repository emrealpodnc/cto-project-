package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.response.DashboardResponseDTO;
import com.example.backend.dto.response.UpcomingDeadlineResponseDTO;
import com.example.backend.service.DashboardService;

@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
public DashboardResponseDTO dashboard() {

    return dashboardService.dashboardBilgileri();

}
@GetMapping("/{kullaniciId}")
public DashboardResponseDTO dashboardByManager(
        @PathVariable Long kullaniciId) {

    return dashboardService.dashboardBilgileri(kullaniciId);

}
    @GetMapping("/dashboard/{kullaniciId}")
public DashboardResponseDTO dashboard(
        @PathVariable Long kullaniciId) {

    return dashboardService.dashboardBilgileri(kullaniciId);

}
    @GetMapping("/dashboard/upcoming-deadlines")
    public List<UpcomingDeadlineResponseDTO> yaklasanTeslimTarihleri() {

        return dashboardService.yaklasanTeslimTarihleri();

    }

    @GetMapping("/dashboard/upcoming-deadlines/{kullaniciId}")
    public List<UpcomingDeadlineResponseDTO> yaklasanTeslimTarihleri(
            @PathVariable Long kullaniciId) {

        return dashboardService.yaklasanTeslimTarihleri(kullaniciId);

    }

}