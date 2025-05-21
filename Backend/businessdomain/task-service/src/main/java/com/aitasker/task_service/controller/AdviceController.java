package com.aitasker.task_service.controller;

import com.aitasker.task_service.dto.OptimizationAdviceRequestDTO;
import com.aitasker.task_service.dto.ProcrastinationAdviceRequestDTO;
import com.aitasker.task_service.dto.AdviceResponseDTO;
import com.aitasker.task_service.service.AdviceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;

    @PostMapping("/anti-procrastination-tip")
    public ResponseEntity<AdviceResponseDTO> getAntiProcrastinationTip(
            @RequestBody @Valid ProcrastinationAdviceRequestDTO request
    ) {
        return ResponseEntity.ok(adviceService.getAntiProcrastinationAdvice(request));
    }

    @PostMapping("/optimization-tip")
    public ResponseEntity<AdviceResponseDTO> getOptimizationTip(
            @RequestBody @Valid OptimizationAdviceRequestDTO request
    ) {
        return ResponseEntity.ok(adviceService.getOptimizationAdvice(request));
    }

}
