package com.aitasker.ai_service.dto;

import com.aitasker.ai_service.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequestDTO {
    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private Priority priority;
}
