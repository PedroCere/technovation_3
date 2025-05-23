package com.aitasker.task_service.dto;

import com.aitasker.task_service.domain.Task;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ScheduleRequestDTO {

    @NotEmpty
    private List<Task> tasks;

    private Map<String, Object> habits;

    @NotEmpty
    private List<TimeSlot> freeTime;

    @Data
    public static class TimeSlot {
        private String day;
    }
}
