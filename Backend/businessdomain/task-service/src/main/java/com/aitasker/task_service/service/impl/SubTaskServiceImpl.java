package com.aitasker.task_service.service.impl;

import com.aitasker.task_service.domain.SubTask;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.SubTaskDTO;
import com.aitasker.task_service.exception.TaskNotFoundException;
import com.aitasker.task_service.persistence.SubTaskRepository;
import com.aitasker.task_service.persistence.TaskRepository;
import com.aitasker.task_service.service.SubTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubTaskServiceImpl implements SubTaskService {
    private final TaskRepository taskRepository;
    private final SubTaskRepository subTaskRepository;

    @Override
    public SubTaskDTO createSubTask(Long taskId, SubTaskDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        SubTask subTask = SubTask.builder()
                .title(dto.getTitle())
                .done(dto.isDone())
                .task(task)
                .build();

        return toDto(subTaskRepository.save(subTask));
    }

    @Override
    public SubTaskDTO updateSubTask(Long taskId, Long subtaskId, SubTaskDTO dto) {
        SubTask subTask = subTaskRepository.findById(subtaskId)
                .filter(st -> st.getTask().getId().equals(taskId))
                .orElseThrow(() -> new TaskNotFoundException(taskId)); // o SubTaskNotFoundException si lo prefieres

        subTask.setDone(dto.isDone());
        subTask.setTitle(dto.getTitle());
        return toDto(subTaskRepository.save(subTask));
    }

    @Override
    public void deleteSubTask(Long taskId, Long subtaskId) {
        SubTask subTask = subTaskRepository.findById(subtaskId)
                .filter(st -> st.getTask().getId().equals(taskId))
                .orElseThrow(() -> new TaskNotFoundException(taskId));
        subTaskRepository.delete(subTask);
    }

    private SubTaskDTO toDto(SubTask entity) {
        SubTaskDTO dto = new SubTaskDTO();
        dto.setTitle(entity.getTitle());
        dto.setDone(entity.isDone());
        return dto;
    }
}
