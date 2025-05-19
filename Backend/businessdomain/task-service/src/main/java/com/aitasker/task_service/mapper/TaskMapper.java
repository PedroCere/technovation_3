package com.aitasker.task_service.mapper;

import com.aitasker.task_service.domain.SubTask;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.SubTaskDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class TaskMapper {

    public Task toEntity(TaskRequestDTO dto) {
        return Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .priority(dto.getPriority())
                .completed(false)
                .subtasks(dto.getSubtasks() != null ?
                        dto.getSubtasks().stream()
                                .map(sub -> SubTask.builder()
                                        .title(sub.getTitle())
                                        .done(sub.isDone())
                                        .build())
                                .collect(Collectors.toList())
                        : new ArrayList<>()
                )
                .build();
    }

    public TaskResponseDTO toDTO(Task task) {
        return TaskResponseDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .priority(task.getPriority())
                .completed(task.isCompleted())
                .importanceScore(task.getImportanceScore())
                .suggestedTimeBlock(task.getSuggestedTimeBlock())
                .subtasks(task.getSubtasks() != null ?
                        task.getSubtasks().stream()
                                .map(sub -> {
                                    SubTaskDTO dto = new SubTaskDTO();
                                    dto.setTitle(sub.getTitle());
                                    dto.setDone(sub.isDone());
                                    return dto;
                                })
                                .collect(Collectors.toList())
                        : new ArrayList<>()
                )
                .build();
    }
}
