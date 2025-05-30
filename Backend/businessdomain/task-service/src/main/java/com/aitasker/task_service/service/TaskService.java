package com.aitasker.task_service.service;

import com.aitasker.task_service.dto.SuggestedBlockDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO taskDTO);

    List<TaskResponseDTO> getTasks(Optional<LocalDate> date);

    TaskResponseDTO getTask(Long id);

    List<TaskResponseDTO> getAllTasks();

    TaskResponseDTO updateTask(Long id, TaskRequestDTO taskDTO);

    void deleteTask(Long id);
    List<TaskResponseDTO> getTasksByProjectId(Long projectId);


    public TaskResponseDTO updateSuggestedTimeBlock(Long taskId, SuggestedBlockDTO dto);

}
