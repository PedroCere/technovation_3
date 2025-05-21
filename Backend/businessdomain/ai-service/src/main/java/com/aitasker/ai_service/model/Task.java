package com.aitasker.ai_service.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Task {
    private String title;
    private String description;
    private LocalDate dueDate;
    private Priority priority;
}
