package com.aitasker.task_service.dto;

import com.aitasker.task_service.domain.Priority;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class TaskResponseDTO {
        private Long id;
        private Long projectId;
        private String title;
        private String description;
        private LocalDate dueDate;
        private Priority priority;
        private boolean completed;
        private Double importanceScore;
        private String suggestedTimeBlock;
        private List<SubTaskDTO> subtasks;
}


