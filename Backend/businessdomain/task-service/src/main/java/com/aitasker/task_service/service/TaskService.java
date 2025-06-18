package com.aitasker.task_service.service;

import com.aitasker.task_service.dto.SuggestedBlockDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO taskDTO, String userEmail);

    List<TaskResponseDTO> getTasks(Optional<LocalDate> date, String userEmail);

    TaskResponseDTO getTask(Long id, String userEmail);

    List<TaskResponseDTO> getAllTasks(String userEmail);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO taskDTO, String userEmail);

    void deleteTask(Long id, String userEmail);

    TaskResponseDTO updateSuggestedTimeBlock(Long taskId, SuggestedBlockDTO dto, String userEmail);

    List<TaskResponseDTO> getTaskSuggestions(TaskRequestDTO taskDTO, String userEmail);
}
