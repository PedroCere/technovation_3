package com.aitasker.ai_service.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProcrastinationAdviceRequestDTO {

    private Map<String, Object> habits;
    private List<TimeSlot> freeTime;;
}
