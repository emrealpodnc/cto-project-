package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import com.example.backend.entity.Project;
import com.example.backend.entity.WeeklyReport;

@Repository
public interface WeeklyReportRepository extends JpaRepository<WeeklyReport, Long> {

    List<WeeklyReport> findAllByOrderByRaporTarihiDesc();
    List<WeeklyReport> findByProjectProjeYoneticisiIdOrderByRaporTarihiDesc(Long projeYoneticisiId);
    List<WeeklyReport> findByProject(Project project);
    Long countByRaporTarihiBetween(LocalDate baslangic, LocalDate bitis);


}