package com.aitasker.ai_service.service;

import com.aitasker.ai_service.dto.*;

import java.util.List;

public interface AiService {
    List<ScoredTaskDTO> prioritizeTasks(List<TaskRequestDTO> tasks);

    public List<ScheduledTaskDTO> scheduleTasks(ScheduleRequestDTO request);

    ProcrastinationAdviceResponseDTO getAntiProcrastinationAdvice(ProcrastinationAdviceRequestDTO request);


}
