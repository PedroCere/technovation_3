package com.aitasker.task_service.service.impl;

import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.client.UserServiceClient;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final ScoreAsyncService scoreAsyncService;

    private final TaskRepository taskRepository;
    private final AiServiceClient aiServiceClient;
    private final TaskMapper taskMapper;
    private final UserServiceClient userServiceClient;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskDTO, String userEmail) {
        // Fetch user info from auth-service or user-service if needed
        Long userId = userServiceClient.getUserIdByEmail(userEmail);

        Task task = taskMapper.toEntity(taskDTO);
        task.setUserId(userId);
        Task saved = taskRepository.save(task);
        scoreAsyncService.reprocessScoreAsync(saved);
        try {
            List<ScoredTaskDTO> scoredList = aiServiceClient.recalculatePriority(
                    List.of(taskMapper.toRequestDTO(saved))
            );

            scoredList.forEach(scored -> {
                if (scored.getTitle().equals(saved.getTitle())) {
                    saved.setImportanceScore(scored.getImportanceScore());
                    taskRepository.save(saved);
                }
            });
        } catch (Exception e) {
            System.err.println("AI service call failed: " + e.getMessage());
        }

        return taskMapper.toDTO(saved);
    }


    @Override
    public List<TaskResponseDTO> getTasks(Optional<LocalDate> date, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        List<Task> tasks = date.map(d -> taskRepository.findByDueDateAndUserId(d, userId))
                .orElseGet(() -> taskRepository.findByUserId(userId));
        return tasks.stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO taskDTO, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        Task task = taskRepository.findByIdAndUserId(id, userId)
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
    public void deleteTask(Long id, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        Task task = taskRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new TaskNotFoundException(id));
        taskRepository.delete(task);
    }

    @Override
    public TaskResponseDTO updateSuggestedTimeBlock(Long taskId, SuggestedBlockDTO dto, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        task.setRecommendedDay(dto.getDay());
        task.setStartTime(dto.getStart());
        task.setEndTime(dto.getEnd());
        task.setSuggestedTimeBlock(dto.getDay() + " " + dto.getStart() + " - " + dto.getEnd());

        Task updated = taskRepository.save(task);
        return taskMapper.toDTO(updated);
    }

    @Override
    public TaskResponseDTO getTask(Long taskId, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        return taskMapper.toDTO(task);
    }

    @Override
    public List<TaskResponseDTO> getAllTasks(String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        List<Task> tasks = taskRepository.findByUserId(userId);

        return tasks.stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDTO> getTaskSuggestions(TaskRequestDTO taskDTO, String userEmail) {
        Long userId = userServiceClient.getUserIdByEmail(userEmail);
        // For now, a simple stub implementation returning all tasks for the user as suggestions.
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }
}
