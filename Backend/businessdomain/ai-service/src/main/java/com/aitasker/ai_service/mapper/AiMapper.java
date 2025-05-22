package com.aitasker.ai_service.mapper;

import com.aitasker.ai_service.dto.TaskRequestDTO;
import com.aitasker.ai_service.model.Task;
import org.springframework.stereotype.Component;

@Component
public class AiMapper {

    public Task toModel(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setPriority(dto.getPriority());
        return task;
    }
}
