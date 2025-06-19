package com.aitasker.task_service.controller;

import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import com.aitasker.task_service.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@Import(com.aitasker.task_service.config.TokenBucketRateLimitingFilter.class)
@WithMockUser(username = "test@example.com")
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    private TaskRequestDTO taskRequestDTO;
    private TaskResponseDTO taskResponseDTO;

    @BeforeEach
    public void setUp() {
        taskRequestDTO = new TaskRequestDTO();
        taskRequestDTO.setTitle("Test Task");
        taskRequestDTO.setDescription("Description");
        taskRequestDTO.setDueDate(LocalDate.now());
        taskRequestDTO.setPriority(com.aitasker.task_service.domain.Priority.HIGH);

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
    public void testCreateTask() throws Exception {
        Mockito.when(taskService.createTask(any(TaskRequestDTO.class), any(String.class))).thenReturn(taskResponseDTO);

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequestDTO))
                .with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    public void testGetTasks() throws Exception {
        List<TaskResponseDTO> tasks = Collections.singletonList(taskResponseDTO);
        Mockito.when(taskService.getTasks(eq(Optional.empty()), any(String.class))).thenReturn(tasks);

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Task"));
    }

    @Test
    public void testGetTask() throws Exception {
        Mockito.when(taskService.getTask(anyLong(), any(String.class))).thenReturn(taskResponseDTO);

        mockMvc.perform(get("/tasks/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    public void testUpdateTask() throws Exception {
        Mockito.when(taskService.updateTask(eq(1L), any(TaskRequestDTO.class), any(String.class))).thenReturn(taskResponseDTO);

        mockMvc.perform(put("/tasks/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequestDTO))
                .with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    public void testDeleteTask() throws Exception {
        Mockito.doNothing().when(taskService).deleteTask(eq(1L), any(String.class));

        mockMvc.perform(delete("/tasks/{id}", 1L)
                .with(org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isNoContent());
    }
}
