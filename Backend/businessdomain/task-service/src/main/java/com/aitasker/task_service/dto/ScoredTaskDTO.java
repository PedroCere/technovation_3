package com.aitasker.task_service.dto;

import lombok.Data;

@Data
public class ScoredTaskDTO {
    private String title;
    private double importanceScore;
}
