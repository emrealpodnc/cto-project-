package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.DayOfWeek;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.example.backend.dto.response.DashboardResponseDTO;
import com.example.backend.dto.response.UpcomingDeadlineResponseDTO;
import com.example.backend.entity.Project;
import com.example.backend.enums.ProjeDurumu;
import com.example.backend.enums.Oncelik;
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

    dto.setToplamProje(
            projectRepository.count());

    dto.setDevamEdenProje(
            projectRepository.countByDurum(ProjeDurumu.DEVAM_EDIYOR));

    dto.setTamamlananProje(
            projectRepository.countByDurum(ProjeDurumu.TAMAMLANDI));

    dto.setPlanlananProje(
            projectRepository.countByDurum(ProjeDurumu.PLANLANDI));

    dto.setBeklemedeProje(
            projectRepository.countByDurum(ProjeDurumu.BEKLEME));

    dto.setRiskliProje(
            projectRepository.countByDurum(ProjeDurumu.RISKLI));

    dto.setYuksekOncelikliProje(
            projectRepository.countByOncelik(Oncelik.YUKSEK));

    LocalDate bugun = LocalDate.now();

LocalDate haftaBaslangici = bugun.with(DayOfWeek.MONDAY);

LocalDate haftaBitisi = bugun.with(DayOfWeek.SUNDAY);

dto.setBuHaftaEklenenRapor(
        weeklyReportRepository.countByRaporTarihiBetween(
                haftaBaslangici,
                haftaBitisi));

    return dto;
}
public DashboardResponseDTO dashboardBilgileri(Long kullaniciId) {

    DashboardResponseDTO dto = new DashboardResponseDTO();

    dto.setToplamProje(
            projectRepository.countByProjeYoneticisiId(kullaniciId));

    dto.setDevamEdenProje(
            projectRepository.countByProjeYoneticisiIdAndDurum(
                    kullaniciId,
                    ProjeDurumu.DEVAM_EDIYOR));

    dto.setTamamlananProje(
            projectRepository.countByProjeYoneticisiIdAndDurum(
                    kullaniciId,
                    ProjeDurumu.TAMAMLANDI));
                    dto.setPlanlananProje(
        projectRepository.countByProjeYoneticisiIdAndDurum(
                kullaniciId,
                ProjeDurumu.PLANLANDI));

dto.setBeklemedeProje(
        projectRepository.countByProjeYoneticisiIdAndDurum(
                kullaniciId,
                ProjeDurumu.BEKLEME));

    dto.setRiskliProje(
            projectRepository.countByProjeYoneticisiIdAndDurum(
                    kullaniciId,
                    ProjeDurumu.RISKLI));
        dto.setYuksekOncelikliProje(
        projectRepository.countByOncelik(Oncelik.YUKSEK));
    dto.setYuksekOncelikliProje(
        projectRepository.countByProjeYoneticisiIdAndOncelik(
                kullaniciId,
                Oncelik.YUKSEK));
   LocalDate bugun = LocalDate.now();

LocalDate haftaBaslangici = bugun.with(DayOfWeek.MONDAY);

LocalDate haftaBitisi = bugun.with(DayOfWeek.SUNDAY);

dto.setBuHaftaEklenenRapor(
        weeklyReportRepository.countByRaporTarihiBetween(
                haftaBaslangici,
                haftaBitisi));

    return dto;
}
    public List<UpcomingDeadlineResponseDTO> yaklasanTeslimTarihleri() {

        return projectRepository
                .findTop5ByOrderByBitisTarihiAsc()
                .stream()
                .map(this::toUpcomingDeadlineDTO)
                .collect(Collectors.toList());

    }

    public List<UpcomingDeadlineResponseDTO> yaklasanTeslimTarihleri(Long kullaniciId) {

        return projectRepository
                .findTop5ByProjeYoneticisiIdOrderByBitisTarihiAsc(kullaniciId)
                .stream()
                .map(this::toUpcomingDeadlineDTO)
                .collect(Collectors.toList());

    }

   private UpcomingDeadlineResponseDTO toUpcomingDeadlineDTO(Project project) {

    UpcomingDeadlineResponseDTO dto = new UpcomingDeadlineResponseDTO();

    dto.setId(project.getId());
    dto.setProjeAdi(project.getProjeAdi());
    dto.setBitisTarihi(project.getBitisTarihi());

    LocalDate bugun = LocalDate.now();

    LocalDate bitis = project.getBitisTarihi();

    long gunFarki = ChronoUnit.DAYS.between(bugun, bitis);

    dto.setKalanGun(gunFarki);

    if (gunFarki < 0) {

        dto.setDurum("GECIKTI");

    } else if (gunFarki == 0) {

        dto.setDurum("SON_GUN");

    } else if (gunFarki <= 3) {

        dto.setDurum("YAKLASIYOR");

    } else {

        dto.setDurum("DEVAM");

    }

    return dto;
}

}