package com.example.backend.repository;


import com.example.backend.entity.Project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.backend.enums.ProjeDurumu;
import com.example.backend.enums.Oncelik;
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByDurum(ProjeDurumu durum);

List<Project> findByOncelik(Oncelik oncelik);

List<Project> findByProjeYoneticisiId(Long projeYoneticisiId);

List<Project> findByProjeAdiContainingIgnoreCase(String projeAdi);
    Long countByDurum(ProjeDurumu durum);

    List<Project> findTop5ByOrderByBitisTarihiAsc();

}