package com.aitasker.ai_service.controller;

import com.aitasker.ai_service.dto.*;
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

    @PostMapping("/schedule")
    public ResponseEntity<List<ScheduledTaskDTO>> scheduleTasks(
            @RequestBody @Valid ScheduleRequestDTO request
    ) {
        List<ScheduledTaskDTO> result = aiService.scheduleTasks(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/advice/anti-procrastination")
    public ResponseEntity<AdviceResponseDTO> getAdvice(@RequestBody ProcrastinationAdviceRequestDTO request) {
        return ResponseEntity.ok(aiService.getAntiProcrastinationAdvice(request));
    }

    @PostMapping("/advice/optimization")
    public ResponseEntity<AdviceResponseDTO> getOptimizationAdvice(@RequestBody OptimizationAdviceRequestDTO request) {
        return ResponseEntity.ok(aiService.getOptimizationAdvice(request));
    }


}
