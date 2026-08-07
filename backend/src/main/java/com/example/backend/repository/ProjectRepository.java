package com.example.backend.repository;

import com.example.backend.entity.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.example.backend.enums.ProjeDurumu;
import com.example.backend.enums.Oncelik;

public interface ProjectRepository extends
        JpaRepository<Project, Long>,
        JpaSpecificationExecutor<Project> {

    List<Project> findByDurum(ProjeDurumu durum);

    List<Project> findByOncelik(Oncelik oncelik);

    List<Project> findByProjeYoneticisiId(Long projeYoneticisiId);

    List<Project> findByProjeYoneticisiIdOrderByBitisTarihiAsc(Long projeYoneticisiId);

    List<Project> findByProjeAdiContainingIgnoreCase(String projeAdi);

    Long countByDurum(ProjeDurumu durum);
    Long countByOncelik(Oncelik oncelik);
    long countByProjeYoneticisiId(Long kullaniciId);

    long countByProjeYoneticisiIdAndDurum(
        Long kullaniciId,
        ProjeDurumu durum
    );
    long countByProjeYoneticisiIdAndOncelik(
    Long kullaniciId,
    Oncelik oncelik
);
    List<Project> findAllByOrderByBitisTarihiAsc();

    List<Project> findTop5ByOrderByBitisTarihiAsc();

    List<Project> findTop5ByProjeYoneticisiIdOrderByBitisTarihiAsc(Long projeYoneticisiId);

}