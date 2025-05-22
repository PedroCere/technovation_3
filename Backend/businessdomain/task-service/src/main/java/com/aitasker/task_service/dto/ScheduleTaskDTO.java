package com.aitasker.task_service.dto;

import lombok.Data;

@Data
public class ScheduleTaskDTO {
    private String taskTitle;
    private String day;
    private String start;
    private String end;
}
