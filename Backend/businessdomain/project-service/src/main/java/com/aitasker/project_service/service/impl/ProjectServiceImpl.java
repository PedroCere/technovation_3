package com.aitasker.project_service.service.impl;

import com.aitasker.project_service.client.TaskServiceClient;
import com.aitasker.project_service.domain.Project;
import com.aitasker.project_service.dto.ProjectRequestDTO;
import com.aitasker.project_service.dto.ProjectResponseDTO;
import com.aitasker.project_service.dto.ProjectWithTaskResponseDTO;
import com.aitasker.project_service.dto.TaskResponseDTO;
import com.aitasker.project_service.mapper.ProjectMapper;
import com.aitasker.project_service.persistence.ProjectRepository;
import com.aitasker.project_service.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TaskServiceClient taskServiceClient;

    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO dto) {
        Project project = projectMapper.toEntity(dto);
        return projectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        return projectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectResponseDTO getProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        return projectMapper.toDTO(project);
    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectWithTaskResponseDTO getProjectWithTasks(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        List<TaskResponseDTO> tasks = taskServiceClient.getTasksByProjectId(id);
        return ProjectWithTaskResponseDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .tasks(tasks)
                .build();
    }
}
