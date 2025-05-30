package com.aitasker.project_service.mapper;

import com.aitasker.project_service.domain.Project;
import com.aitasker.project_service.dto.ProjectRequestDTO;
import com.aitasker.project_service.dto.ProjectResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public Project toEntity(ProjectRequestDTO dto) {
        return Project.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();
    }

    public ProjectResponseDTO toDTO(Project project) {
        return ProjectResponseDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .build();
    }
}
