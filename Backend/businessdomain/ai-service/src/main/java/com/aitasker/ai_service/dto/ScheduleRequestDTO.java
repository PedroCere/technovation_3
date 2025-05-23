package com.aitasker.ai_service.dto;

import com.aitasker.ai_service.model.Task;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ScheduleRequestDTO {

    @NotEmpty
    private List<Task> tasks;  // Usamos el modelo interno directamente

    private Map<String, Object> habits;  // Por ahora, sin estructura fuerte

    @NotEmpty
    private List<TimeSlot> freeTime;

    @Data
    public static class TimeSlot {
        private String day;   // ISO date string, ej: 2025-05-20
        private String start; // "09:00"
        private String end;   // "10:00"
    }
}
