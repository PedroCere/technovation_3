package com.aitasker.ai_service.service;

import com.aitasker.ai_service.dto.ScheduleRequestDTO;
import com.aitasker.ai_service.dto.ScheduledTaskDTO;
import com.aitasker.ai_service.dto.ScoredTaskDTO;
import com.aitasker.ai_service.dto.TaskRequestDTO;

import java.util.List;

public interface AiService {
    List<ScoredTaskDTO> prioritizeTasks(List<TaskRequestDTO> tasks);

    public List<ScheduledTaskDTO> scheduleTasks(ScheduleRequestDTO request);

}
