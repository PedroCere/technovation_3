package com.aitasker.ai_service.service.impl;

import com.aitasker.ai_service.client.OpenRouterClient;
import com.aitasker.ai_service.dto.ScheduleRequestDTO;
import com.aitasker.ai_service.dto.ScheduledTaskDTO;
import com.aitasker.ai_service.dto.ScoredTaskDTO;
import com.aitasker.ai_service.dto.TaskRequestDTO;
import com.aitasker.ai_service.exception.AiRequestException;
import com.aitasker.ai_service.mapper.AiMapper;
import com.aitasker.ai_service.model.Task;
import com.aitasker.ai_service.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final OpenRouterClient openRouterClient;
    private final AiMapper aiMapper;

    @Override
    public List<ScoredTaskDTO> prioritizeTasks(List<TaskRequestDTO> tasks) {
        List<Task> domainTasks = tasks.stream()
                .map(aiMapper::toModel)
                .collect(Collectors.toList());

        try {
            return openRouterClient.requestTaskPrioritization(domainTasks);
        } catch (Exception e) {
            throw new AiRequestException("Error contacting AI model", e);
        }
    }

    @Override
    public List<ScheduledTaskDTO> scheduleTasks(ScheduleRequestDTO request) {
        try {
            return openRouterClient.scheduleTasks(request);
        } catch (Exception e) {
            throw new AiRequestException("Failed to get schedule from AI", e);
        }
    }

}
