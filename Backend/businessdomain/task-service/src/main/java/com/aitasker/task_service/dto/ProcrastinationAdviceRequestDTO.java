package com.aitasker.task_service.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProcrastinationAdviceRequestDTO {

    private Map<String, Object> habits;
    private List<TimeSlot> freeTime;

    @Data
    public static class TimeSlot {
        private String day;   // e.g., "2025-05-21"
        private String start; // e.g., "09:00"
        private String end;   // e.g., "10:00"
    }
}
