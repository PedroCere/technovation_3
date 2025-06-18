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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private AiServiceClient aiServiceClient;

    @Mock
    private TaskMapper taskMapper;

    @Mock
    private ScoreAsyncService scoreAsyncService;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private TaskRequestDTO taskRequestDTO;
    private TaskResponseDTO taskResponseDTO;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

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

        taskResponseDTO = com.aitasker.task_service.dto.TaskResponseDTO.builder()
                .id(1L)
                .title("Test Task")
                .description("Description")
                .dueDate(LocalDate.now())
                .priority(com.aitasker.task_service.domain.Priority.HIGH)
                .completed(false)
                .importanceScore(0.0)
                .suggestedTimeBlock(null)
                .subtasks(java.util.Collections.emptyList())
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
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.createTask(taskRequestDTO);

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
        when(taskRepository.findByDueDate(date)).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTasks(Optional.of(date));

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testGetTasks_WithoutDate() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findAll()).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTasks(Optional.empty());

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testUpdateTask_Success() {
        ScoredTaskDTO scoredTaskDTO = new ScoredTaskDTO();
        scoredTaskDTO.setTitle("Test Task");
        scoredTaskDTO.setImportanceScore(10.0);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toRequestDTO(task)).thenReturn(taskRequestDTO);
        when(aiServiceClient.recalculatePriority(anyList())).thenReturn(Collections.singletonList(scoredTaskDTO));
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.updateTask(1L, taskRequestDTO);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, atLeastOnce()).save(task);
    }

    @Test
    public void testUpdateTask_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.updateTask(1L, taskRequestDTO);
        });
    }

    @Test
    public void testDeleteTask_Success() {
        when(taskRepository.existsById(1L)).thenReturn(true);
        doNothing().when(taskRepository).deleteById(1L);

        assertDoesNotThrow(() -> taskService.deleteTask(1L));
        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteTask_NotFound() {
        when(taskRepository.existsById(1L)).thenReturn(false);

        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask(1L));
    }

    @Test
    public void testUpdateSuggestedTimeBlock_Success() {
        SuggestedBlockDTO blockDTO = new SuggestedBlockDTO();
        blockDTO.setDay(java.time.LocalDate.now());
        blockDTO.setStart(java.time.LocalTime.of(9, 0));
        blockDTO.setEnd(java.time.LocalTime.of(10, 0));

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.updateSuggestedTimeBlock(1L, blockDTO);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testGetTask_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        TaskResponseDTO result = taskService.getTask(1L);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
    }

    @Test
    public void testGetTask_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTask(1L));
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findAll()).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getAllTasks();

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testGetTaskSuggestions() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findAll()).thenReturn(tasks);
        when(taskMapper.toDTO(task)).thenReturn(taskResponseDTO);

        List<TaskResponseDTO> result = taskService.getTaskSuggestions(taskRequestDTO);

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }
}
