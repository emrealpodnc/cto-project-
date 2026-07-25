package com.example.backend.controller;

import com.example.backend.entity.Project;
import com.example.backend.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public String test() {
        return projectService.test();
    }

    @PostMapping
    public Project projeKaydet(@RequestBody Project project) {
        return projectService.projeKaydet(project);
    }
}