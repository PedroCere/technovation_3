package com.aitasker.task_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class OptimizationAdviceRequestDTO {
    private List<TaskDTO> tasks;
}
