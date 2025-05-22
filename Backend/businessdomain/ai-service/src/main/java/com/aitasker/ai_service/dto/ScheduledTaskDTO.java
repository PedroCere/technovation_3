package com.aitasker.ai_service.dto;

import lombok.Data;

@Data
public class ScheduledTaskDTO {
    private String taskTitle;
    private String day;
    private String start;
    private String end;
}
