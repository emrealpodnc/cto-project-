package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.request.ProjectRequestDTO;
import com.example.backend.dto.response.ProjectResponseDTO;
import com.example.backend.enums.Oncelik;
import com.example.backend.enums.ProjeDurumu;
import com.example.backend.service.ProjectService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectResponseDTO> tumProjeleriGetir() {
        return projectService.tumProjeleriGetir();
    }

    @GetMapping("/manager/{kullaniciId}")
public List<ProjectResponseDTO> projeYoneticisininProjeleri(
        @PathVariable Long kullaniciId) {

    return projectService.projeYoneticisininProjeleri(kullaniciId);

}

    @GetMapping("/{id}")
public ProjectResponseDTO projeGetir(@PathVariable Long id) {
    return projectService.projeGetir(id);
}

    @PostMapping
    public ProjectResponseDTO projeKaydet(@Valid @RequestBody ProjectRequestDTO dto) {
        return projectService.projeKaydet(dto);
    }

    @PutMapping("/{id}")
    public ProjectResponseDTO projeGuncelle(
        @PathVariable Long id,
        @Valid @RequestBody ProjectRequestDTO dto) {

    return projectService.projeGuncelle(id, dto);
    }
    @DeleteMapping("/{id}")
    public void projeSil(@PathVariable Long id) {
        projectService.projeSil(id);
    }
    @GetMapping("/durum/{durum}")
public List<ProjectResponseDTO> durumaGoreProjeleriGetir(
        @PathVariable ProjeDurumu durum) {

    return projectService.durumaGoreProjeleriGetir(durum);
}
@GetMapping("/oncelik/{oncelik}")
public List<ProjectResponseDTO> onceligeGoreProjeleriGetir(
        @PathVariable Oncelik oncelik) {

    return projectService.onceligeGoreProjeleriGetir(oncelik);
}
}