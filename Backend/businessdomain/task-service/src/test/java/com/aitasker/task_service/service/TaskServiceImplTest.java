package com.aitasker.task_service.service;

import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.ScoredTaskDTO;
import com.aitasker.task_service.dto.SuggestedBlockDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import com.aitasker.task_service.exception.TaskNotFoundException;
import com.aitasker.task_service.mapper.TaskMapper;
import com.aitasker.task_service.persistence.TaskRepository;
import com.aitasker.task_service.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private AiServiceClient aiServiceClient;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask_shouldSaveTaskAndReturnDTO() {
        TaskRequestDTO requestDTO = new TaskRequestDTO();
        requestDTO.setTitle("Test Task");

        Task task = Task.builder().title("Test Task").build();
        Task savedTask = Task.builder().title("Test Task").importanceScore(0.9).build();

        ScoredTaskDTO scored = new ScoredTaskDTO();
        scored.setTitle("Test Task");
        scored.setImportanceScore(0.9);

        TaskResponseDTO responseDTO = TaskResponseDTO.builder().title("Test Task").importanceScore(0.9).build();

        when(taskMapper.toEntity(requestDTO)).thenReturn(task);
        when(taskRepository.save(task)).thenReturn(savedTask);
        when(taskMapper.toRequestDTO(savedTask)).thenReturn(requestDTO);
        when(aiServiceClient.recalculatePriority(List.of(requestDTO))).thenReturn(List.of(scored));
        when(taskMapper.toDTO(savedTask)).thenReturn(responseDTO);

        TaskResponseDTO result = taskService.createTask(requestDTO);

        assertEquals("Test Task", result.getTitle());
        assertEquals(0.9, result.getImportanceScore());
        verify(taskRepository, times(2)).save(any(Task.class));
    }

    @Test
    void getTasks_shouldReturnListOfTasks() {
        Task task = Task.builder().title("Test Task").build();
        TaskResponseDTO dto = TaskResponseDTO.builder().title("Test Task").build();

        when(taskRepository.findAll()).thenReturn(List.of(task));
        when(taskMapper.toDTO(task)).thenReturn(dto);

        List<TaskResponseDTO> result = taskService.getTasks(Optional.empty());

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

//    @Test
//    void updateTask_shouldUpdateAndReturnDTO() {
//        Long id = 1L;
//        TaskResponseDTO requestDTO = new TaskRequestDTO();
//        requestDTO.setTitle("Updated Task");
//
//        Task task = Task.builder().id(id).title("Old Task").build();
//        Task saved = Task.builder().id(id).title("Updated Task").build();
//        TaskResponseDTO responseDTO = TaskResponseDTO.builder().title("Updated Task").build();
//
//        ScoredTaskDTO scored = new ScoredTaskDTO();
//        scored.setTitle("Updated Task");
//        scored.setImportanceScore(0.8);
//
//        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
//        when(taskRepository.save(task)).thenReturn(saved);
//        when(taskMapper.toRequestDTO(saved)).thenReturn(requestDTO);
//        when(aiServiceClient.recalculatePriority(List.of(requestDTO))).thenReturn(List.of(scored));
//        when(taskMapper.toDTO(saved)).thenReturn(responseDTO);
//
//        TaskResponseDTO result = taskService.updateTask(id, requestDTO);
//
//        assertEquals("Updated Task", result.getTitle());
//        verify(taskRepository).save(task);
//    }

    @Test
    void deleteTask_shouldDeleteIfExists() {
        Long id = 1L;
        when(taskRepository.existsById(id)).thenReturn(true);

        taskService.deleteTask(id);

        verify(taskRepository).deleteById(id);
    }

    @Test
    void updateSuggestedTimeBlock_shouldUpdateAndReturnDTO() {
        Long id = 1L;
        SuggestedBlockDTO dto = new SuggestedBlockDTO();
        dto.setDay(LocalDate.of(2025, 5, 22));
        dto.setStart(LocalTime.of(14, 0));
        dto.setEnd(LocalTime.of(16, 0));

        Task task = Task.builder().id(id).build();
        Task updated = Task.builder().id(id).recommendedDay(dto.getDay())
                .startTime(dto.getStart()).endTime(dto.getEnd())
                .suggestedTimeBlock("2025-05-22 14:00 - 16:00")
                .build();
        TaskResponseDTO responseDTO = TaskResponseDTO.builder().title("Scheduled Task").build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(updated);
        when(taskMapper.toDTO(updated)).thenReturn(responseDTO);

        TaskResponseDTO result = taskService.updateSuggestedTimeBlock(id, dto);

        assertEquals("Scheduled Task", result.getTitle());
        verify(taskRepository).save(task);
    }
    @Test
    void getTask_shouldReturnTask() {
        Long id = 1L;
        Task task = Task.builder().id(id).title("Some task").build();
        TaskResponseDTO responseDTO = TaskResponseDTO.builder().title("Some task").build();

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));
        when(taskMapper.toDTO(task)).thenReturn(responseDTO);

        TaskResponseDTO result = taskService.getTask(id);
        assertEquals("Some task", result.getTitle());
    }

    @Test
    void getTask_shouldThrowIfNotFound() {
        Long id = 999L;
        when(taskRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(TaskNotFoundException.class, () -> taskService.getTask(id));
    }

    @Test
    void getAllTasks_shouldReturnAll() {
        Task task = Task.builder().id(1L).title("Bulk Task").build();
        TaskResponseDTO dto = TaskResponseDTO.builder().title("Bulk Task").build();

        when(taskRepository.findAll()).thenReturn(List.of(task));
        when(taskMapper.toDTO(task)).thenReturn(dto);

        List<TaskResponseDTO> result = taskService.getAllTasks();
        assertEquals(1, result.size());
        assertEquals("Bulk Task", result.get(0).getTitle());
    }
}