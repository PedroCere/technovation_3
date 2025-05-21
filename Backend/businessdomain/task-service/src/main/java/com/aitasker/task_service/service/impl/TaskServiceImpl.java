package com.aitasker.task_service.service.impl;

import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.SuggestedBlockDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import com.aitasker.task_service.exception.TaskNotFoundException;
import com.aitasker.task_service.mapper.TaskMapper;
import com.aitasker.task_service.persistence.TaskRepository;
import com.aitasker.task_service.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final AiServiceClient aiServiceClient;
    private final TaskMapper taskMapper;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskDTO) {
        Task task = taskMapper.toEntity(taskDTO);
        Task saved = taskRepository.save(task);
        // Mandar a recalcular prioridad
        aiServiceClient.recalculatePriority(List.of(saved));
        return taskMapper.toDTO(saved);
    }

    @Override
    public List<TaskResponseDTO> getTasks(Optional<LocalDate> date) {
        List<Task> tasks = date.map(taskRepository::findByDueDate)
                .orElseGet(taskRepository::findAll);
        return tasks.stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setPriority(taskDTO.getPriority());

        Task updated = taskRepository.save(task);
        aiServiceClient.recalculatePriority(List.of(updated));
        return taskMapper.toDTO(updated);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
    }

    @Override
    public TaskResponseDTO updateSuggestedTimeBlock(Long taskId, SuggestedBlockDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        task.setRecommendedDay(dto.getDay());
        task.setStartTime(dto.getStart());
        task.setEndTime(dto.getEnd());

        Task updated = taskRepository.save(task);
        return taskMapper.toDTO(updated);
    }

}
