package com.aitasker.project_service.service;

import com.aitasker.project_service.dto.ProjectRequestDTO;
import com.aitasker.project_service.dto.ProjectResponseDTO;
import com.aitasker.project_service.dto.ProjectWithTaskResponseDTO;

import java.util.List;

public interface ProjectService {

    ProjectResponseDTO createProject(ProjectRequestDTO dto);
    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO dto);
    void deleteProject(Long id);
    ProjectResponseDTO getProject(Long id);
    List<ProjectResponseDTO> getAllProjects();
    ProjectWithTaskResponseDTO getProjectWithTasks(Long id);
}
