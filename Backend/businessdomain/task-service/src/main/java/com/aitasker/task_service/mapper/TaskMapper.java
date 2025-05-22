package com.aitasker.task_service.mapper;

import com.aitasker.task_service.domain.SubTask;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.SubTaskDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskMapper {

    public Task toEntity(TaskRequestDTO dto) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .priority(dto.getPriority())
                .completed(false)
                .build();

        if (dto.getSubtasks() != null) {
            List<SubTask> subs = dto.getSubtasks().stream()
                    .map(sub -> {
                        SubTask entity = SubTask.builder()
                                .title(sub.getTitle())
                                .done(sub.isDone())
                                .task(task)
                                .build();
                        return entity;
                    })
                    .collect(Collectors.toList());
            task.setSubtasks(subs);
        } else {
            task.setSubtasks(new ArrayList<>());
        }

        return task;
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

    public TaskRequestDTO toRequestDTO(Task task) {
        TaskRequestDTO dto = new TaskRequestDTO();
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setPriority(task.getPriority());
        dto.setSubtasks(task.getSubtasks() != null ?
                task.getSubtasks().stream()
                        .map(sub -> {
                            SubTaskDTO subDto = new SubTaskDTO();
                            subDto.setTitle(sub.getTitle());
                            subDto.setDone(sub.isDone());
                            return subDto;
                        })
                        .collect(Collectors.toList())
                : new ArrayList<>()
        );
        return dto;
    }

}
