package com.aitasker.task_service.controller;

import com.aitasker.task_service.dto.SubTaskDTO;
import com.aitasker.task_service.service.SubTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks/{taskId}/subtasks")
@RequiredArgsConstructor
public class SubTaskController {

    private final SubTaskService subTaskService;

    @PostMapping
    public ResponseEntity<SubTaskDTO> createSubTask(
            @PathVariable Long taskId,
            @RequestBody @Valid SubTaskDTO subTaskDTO
    ) {
        SubTaskDTO created = subTaskService.createSubTask(taskId, subTaskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{subtaskId}")
    public ResponseEntity<SubTaskDTO> updateSubTask(
            @RequestParam("taskId")
            @PathVariable Long taskId,
            @RequestParam("subtaskId")
            @PathVariable Long subtaskId,
            @RequestBody @Valid SubTaskDTO subTaskDTO
    ) {
        SubTaskDTO updated = subTaskService.updateSubTask(taskId, subtaskId, subTaskDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{subtaskId}")
    public ResponseEntity<Void> deleteSubTask(
            @PathVariable Long taskId,
            @PathVariable Long subtaskId
    ) {
        subTaskService.deleteSubTask(taskId, subtaskId);
        return ResponseEntity.noContent().build();
    }
}
