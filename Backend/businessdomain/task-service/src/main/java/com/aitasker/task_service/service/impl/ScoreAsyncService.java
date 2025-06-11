package com.aitasker.task_service.service.impl;


import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.ScoredTaskDTO;
import com.aitasker.task_service.mapper.TaskMapper;
import com.aitasker.task_service.persistence.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoreAsyncService {

    private final AiServiceClient aiServiceClient;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Async("taskExecutor")
    public void reprocessScoreAsync(Task task) {
        try {
            List<ScoredTaskDTO> scoredList = aiServiceClient.recalculatePriority(
                    List.of(taskMapper.toRequestDTO(task))
            );

            scoredList.forEach(scored -> {
                if (scored.getTitle().equals(task.getTitle())) {
                    task.setImportanceScore(scored.getImportanceScore());
                    taskRepository.save(task);
                    log.info("Updated task [{}] with new importance score: {}", task.getId(), scored.getImportanceScore());
                }
            });

        } catch (Exception e) {
            log.error("Failed to reprocess task scoring for task [{}]: {}", task.getId(), e.getMessage());
        }
    }
}
