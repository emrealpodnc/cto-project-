package com.example.backend.service;

import com.example.backend.entity.Project;
import com.example.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public String test() {
        return "Merhaba CTO Takip Sistemi";
    }

    public Project projeKaydet(Project project) {
        return projectRepository.save(project);
    }

}