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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private AiServiceClient aiServiceClient;

    @Mock
    private TaskMapper taskMapper;

    @Mock
    private ScoreAsyncService scoreAsyncService;

    @Mock
    private UserServiceClient userServiceClient;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private TaskRequestDTO taskRequestDTO;
    private TaskResponseDTO taskResponseDTO;
    private final String userEmail = "test@example.com";
    private final Long userId = 1L;

    @BeforeEach
    public void setUp() {
        // MockitoAnnotations.openMocks(this); // No longer needed with MockitoExtension

        when(userServiceClient.getUserIdByEmail(userEmail)).thenReturn(userId);

        taskRequestDTO = new TaskRequestDTO();
        taskRequestDTO.setTitle("Test Task");
        taskRequestDTO.setDescription("Description");
        taskRequestDTO.setDueDate(LocalDate.now());
        taskRequestDTO.setPriority(com.aitasker.task_service.domain.Priority.HIGH);

        task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setDescription("Description");
        task.setDueDate(LocalDate.now());
        task.setPriority(com.aitasker.task_service.domain.Priority.HIGH);
        task.setUserId(userId);

        taskResponseDTO = com.aitasker.task_service.dto.TaskResponseDTO.builder()
                .id(1L)
                .title("Test Task")
                .description("Description")
                .dueDate(LocalDate.now())
                .priority(com.aitasker.task_service.domain.Priority.HIGH)
                .completed(false)
                .importanceScore(0.0)
                .suggestedTimeBlock(null)
                .subtasks(Collections.emptyList())
                .build();
    }

    @Test
    public void testCreateTask_Success() {
        ScoredTaskDTO scoredTaskDTO = new ScoredTaskDTO();
        scoredTaskDTO.setTitle("Test Task");
        scoredTaskDTO.setImportanceScore(10.0);

        when(taskMapper.toEntity(taskRequestDTO)).thenReturn(task);
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toRequestDTO(task)).thenReturn(taskRequestDTO);
        when(aiServiceClient.recalculatePriority(anyList())).thenReturn(Collections.singletonList(scoredTaskDTO));
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.createTask(taskRequestDTO, userEmail);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(scoreAsyncService, times(1)).reprocessScoreAsync(task);
        verify(aiServiceClient, times(1)).recalculatePriority(anyList());
        verify(taskRepository, atLeastOnce()).save(task);
    }

    @Test
    public void testGetTasks_WithDate() {
        LocalDate date = LocalDate.now();
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findByDueDateAndUserId(date, userId)).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTasks(Optional.of(date), userEmail);

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testGetTasks_WithoutDate() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findByUserId(userId)).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTasks(Optional.empty(), userEmail);

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testUpdateTask_Success() {
        ScoredTaskDTO scoredTaskDTO = new ScoredTaskDTO();
        scoredTaskDTO.setTitle("Test Task");
        scoredTaskDTO.setImportanceScore(10.0);

        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toRequestDTO(task)).thenReturn(taskRequestDTO);
        when(aiServiceClient.recalculatePriority(anyList())).thenReturn(Collections.singletonList(scoredTaskDTO));
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.updateTask(1L, taskRequestDTO, userEmail);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).findByIdAndUserId(1L, userId);
        verify(taskRepository, atLeastOnce()).save(task);
    }

    @Test
    public void testUpdateTask_NotFound() {
        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.updateTask(1L, taskRequestDTO, userEmail);
        });
    }

    @Test
    public void testDeleteTask_Success() {
        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.of(task));
        doNothing().when(taskRepository).delete(task);

        assertDoesNotThrow(() -> taskService.deleteTask(1L, userEmail));
        verify(taskRepository, times(1)).delete(task);
    }

    @Test
    public void testDeleteTask_NotFound() {
        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask(1L, userEmail));
    }

    @Test
    public void testUpdateSuggestedTimeBlock_Success() {
        SuggestedBlockDTO blockDTO = new SuggestedBlockDTO();
        blockDTO.setDay(LocalDate.now());
        blockDTO.setStart(java.time.LocalTime.of(9, 0));
        blockDTO.setEnd(java.time.LocalTime.of(10, 0));

        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.updateSuggestedTimeBlock(1L, blockDTO, userEmail);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).findByIdAndUserId(1L, userId);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testGetTask_Success() {
        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.of(task));
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.getTask(1L, userEmail);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
    }

    @Test
    public void testGetTask_NotFound() {
        when(taskRepository.findByIdAndUserId(1L, userId)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTask(1L, userEmail));
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findByUserId(userId)).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getAllTasks(userEmail);

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testGetTaskSuggestions() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findByUserId(userId)).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTaskSuggestions(taskRequestDTO, userEmail);

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }
}
