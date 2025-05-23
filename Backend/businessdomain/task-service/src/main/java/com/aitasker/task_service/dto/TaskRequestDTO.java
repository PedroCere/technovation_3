package com.aitasker.task_service.dto;

import com.aitasker.task_service.domain.Priority;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TaskRequestDTO {

    @NotBlank
    private String title;

    private String description;

    @FutureOrPresent
    private LocalDate dueDate;

    private Priority priority;

    private List<SubTaskDTO> subtasks;
}
