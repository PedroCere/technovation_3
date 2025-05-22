package com.aitasker.ai_service.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ScoredTaskDTO {

    private String title;
    private double importanceScore;
}
