package com.aitasker.ai_service.controller;

import com.aitasker.ai_service.dto.ScoredTaskDTO;
import com.aitasker.ai_service.dto.TaskRequestDTO;
import com.aitasker.ai_service.service.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/prioritize")
    public ResponseEntity<List<ScoredTaskDTO>> prioritizeTasks(
            @RequestBody @Valid List<TaskRequestDTO> tasks
    ) {
        List<ScoredTaskDTO> result = aiService.prioritizeTasks(tasks);
        return ResponseEntity.ok(result);
    }
}
