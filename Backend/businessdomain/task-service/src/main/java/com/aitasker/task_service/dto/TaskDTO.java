package com.aitasker.task_service.dto;

import com.aitasker.task_service.domain.Priority;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDTO {

    private String title;
    private Long projectId;
    private String description;
    private LocalDate dueDate;
    private Priority priority;
}
