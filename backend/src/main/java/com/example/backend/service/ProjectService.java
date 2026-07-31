package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.example.backend.enums.Oncelik;
import com.example.backend.dto.request.ProjectRequestDTO;
import com.example.backend.dto.response.ProjectResponseDTO;
import com.example.backend.entity.Project;
import com.example.backend.entity.User;
import com.example.backend.enums.ProjeDurumu;
import com.example.backend.mapper.ProjectMapper;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.UserRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository,
                          ProjectMapper projectMapper) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectMapper = projectMapper;
    }

    public String test() {
        return "Merhaba CTO Takip Sistemi";
    }

    public ProjectResponseDTO projeKaydet(ProjectRequestDTO dto) {

        User yonetici = userRepository.findById(dto.getProjeYoneticisiId())
                .orElseThrow(() -> new RuntimeException("Proje yöneticisi bulunamadı."));

        Project project = new Project();

        project.setProjeAdi(dto.getProjeAdi());
        project.setAciklama(dto.getAciklama());
        project.setDurum(dto.getDurum());
        project.setOncelik(dto.getOncelik());
        project.setProjeYoneticisi(yonetici);
        project.setTamamlanmaYuzdesi(dto.getTamamlanmaYuzdesi());
        project.setBaslangicTarihi(dto.getBaslangicTarihi());
        project.setBitisTarihi(dto.getBitisTarihi());
        project = projectRepository.save(project);

        return projectMapper.toResponse(project);
    }

    public List<ProjectResponseDTO> tumProjeleriGetir() {

        return projectRepository.findAll()
                .stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ProjectResponseDTO projeGetir(Long id) {

    Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

    return projectMapper.toResponse(project);
}

public ProjectResponseDTO projeGuncelle(Long id, ProjectRequestDTO dto) {

    Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

    User yonetici = userRepository.findById(dto.getProjeYoneticisiId())
            .orElseThrow(() -> new RuntimeException("Proje yöneticisi bulunamadı."));

    project.setProjeAdi(dto.getProjeAdi());
    project.setAciklama(dto.getAciklama());
    project.setDurum(dto.getDurum());
    project.setOncelik(dto.getOncelik());
    project.setTamamlanmaYuzdesi(dto.getTamamlanmaYuzdesi());
    project.setBaslangicTarihi(dto.getBaslangicTarihi());
    project.setBitisTarihi(dto.getBitisTarihi());
    project.setProjeYoneticisi(yonetici);

    project = projectRepository.save(project);

    return projectMapper.toResponse(project);
}
   public void projeSil(Long id) {

    Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

    projectRepository.delete(project);
}
public List<ProjectResponseDTO> durumaGoreProjeleriGetir(ProjeDurumu durum) {

    return projectRepository.findByDurum(durum)
            .stream()
            .map(projectMapper::toResponse)
            .collect(Collectors.toList());
}
public List<ProjectResponseDTO> onceligeGoreProjeleriGetir(Oncelik oncelik) {

    return projectRepository.findByOncelik(oncelik)
            .stream()
            .map(projectMapper::toResponse)
            .collect(Collectors.toList());
}

public List<ProjectResponseDTO> projeYoneticisininProjeleri(Long kullaniciId) {

    return projectRepository
            .findByProjeYoneticisiId(kullaniciId)
            .stream()
            .map(projectMapper::toResponse)
            .collect(Collectors.toList());

}
    
}