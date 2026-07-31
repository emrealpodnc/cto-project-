package com.example.backend.mapper;

import org.springframework.stereotype.Component;

import com.example.backend.dto.response.ProjectResponseDTO;
import com.example.backend.entity.Project;

@Component
public class ProjectMapper {

    public ProjectResponseDTO toResponse(Project project) {

        ProjectResponseDTO dto = new ProjectResponseDTO();

        dto.setId(project.getId());
        dto.setProjeAdi(project.getProjeAdi());
        dto.setAciklama(project.getAciklama());
        dto.setDurum(project.getDurum());
        dto.setOncelik(project.getOncelik());
        dto.setTamamlanmaYuzdesi(project.getTamamlanmaYuzdesi());
        dto.setBaslangicTarihi(project.getBaslangicTarihi());
        dto.setBitisTarihi(project.getBitisTarihi());
       if (project.getProjeYoneticisi() != null) {
    dto.setProjeYoneticisi(project.getProjeYoneticisi().getAdSoyad());
    dto.setProjeYoneticisiId(project.getProjeYoneticisi().getId());
}
        return dto;
    }

}