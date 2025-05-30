package com.aitasker.project_service.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TaskResponseDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private boolean completed;
    private Double importanceScore;
    private String suggestedTimeBlock;
    private List<SubTaskDTO> subtasks;
}
