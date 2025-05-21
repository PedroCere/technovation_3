package com.aitasker.ai_service.dto;

import java.time.LocalDate;

public class ScoredTaskDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private double importanceScore;
}
