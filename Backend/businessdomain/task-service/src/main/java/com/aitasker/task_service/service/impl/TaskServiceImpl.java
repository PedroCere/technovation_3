package com.aitasker.task_service.service.impl;

import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.ScoredTaskDTO;
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

        List<ScoredTaskDTO> scoredList = aiServiceClient.recalculatePriority(
                List.of(taskMapper.toRequestDTO(saved))
        );

        scoredList.forEach(scored -> {
            if (scored.getTitle().equals(saved.getTitle())) {
                saved.setImportanceScore(scored.getImportanceScore());
                taskRepository.save(saved);
            }
        });

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

        Task saved = taskRepository.save(task);

        List<ScoredTaskDTO> scoredList = aiServiceClient.recalculatePriority(
                List.of(taskMapper.toRequestDTO(saved))
        );

        scoredList.forEach(scored -> {
            if (scored.getTitle().equals(saved.getTitle())) {
                saved.setImportanceScore(scored.getImportanceScore());
                taskRepository.save(saved);
            }
        });


        return taskMapper.toDTO(saved);
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
        task.setSuggestedTimeBlock(dto.getDay() + " " + dto.getStart() + " - " + dto.getEnd());


        Task updated = taskRepository.save(task);
        return taskMapper.toDTO(updated);
    }

    @Override
    public TaskResponseDTO getTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        return taskMapper.toDTO(task);
    }

    @Override
    public List<TaskResponseDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }
}
