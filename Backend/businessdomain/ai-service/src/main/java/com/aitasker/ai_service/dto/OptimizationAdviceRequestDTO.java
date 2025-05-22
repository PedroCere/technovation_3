package com.aitasker.ai_service.dto;

import com.aitasker.ai_service.model.Task;
import lombok.Data;

import java.util.List;

@Data
public class OptimizationAdviceRequestDTO {
    private List<Task> tasks;
}
