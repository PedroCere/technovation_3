package com.aitasker.task_service.controller;

import com.aitasker.task_service.domain.Task;
import com.aitasker.task_service.dto.SuggestedBlockDTO;
import com.aitasker.task_service.dto.TaskRequestDTO;
import com.aitasker.task_service.dto.TaskResponseDTO;
import com.aitasker.task_service.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody @Valid TaskRequestDTO requestDTO) {
        try {
            String userEmail = getCurrentUserEmail();
            TaskResponseDTO created = taskService.createTask(requestDTO, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/suggestions")
    public ResponseEntity<List<TaskResponseDTO>> getTaskSuggestions(@RequestBody @Valid TaskRequestDTO requestDTO) {
        try {
            String userEmail = getCurrentUserEmail();
            List<TaskResponseDTO> suggestions = taskService.getTaskSuggestions(requestDTO, userEmail);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getTasks(
            @RequestParam(name = "date", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        String userEmail = getCurrentUserEmail();
        List<TaskResponseDTO> tasks = taskService.getTasks(Optional.ofNullable(date), userEmail);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTask(@RequestParam(name = "id") @PathVariable Long id){
        String userEmail = getCurrentUserEmail();
        TaskResponseDTO task = taskService.getTask(id, userEmail);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks(){
        String userEmail = getCurrentUserEmail();
        List<TaskResponseDTO> tasks = taskService.getAllTasks(userEmail);
        return ResponseEntity.ok(tasks);
    }

    @PatchMapping("/{id}/schedule")
    public ResponseEntity<TaskResponseDTO> setSuggestedTimeBlock(
            @RequestParam(name = "id")
            @PathVariable Long id,
            @RequestBody @Valid SuggestedBlockDTO blockDTO
    ) {
        String userEmail = getCurrentUserEmail();
        return ResponseEntity.ok(taskService.updateSuggestedTimeBlock(id, blockDTO, userEmail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long id,
            @RequestBody @Valid TaskRequestDTO requestDTO
    ) {
        String userEmail = getCurrentUserEmail();
        TaskResponseDTO updated = taskService.updateTask(id, requestDTO, userEmail);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask( @RequestParam(name = "id") @PathVariable Long id) {
        String userEmail = getCurrentUserEmail();
        taskService.deleteTask(id, userEmail);
        return ResponseEntity.noContent().build();
    }


}
