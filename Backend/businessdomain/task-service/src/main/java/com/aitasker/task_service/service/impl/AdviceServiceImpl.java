package com.aitasker.task_service.service.impl;

import com.aitasker.task_service.client.AiServiceClient;
import com.aitasker.task_service.dto.OptimizationAdviceRequestDTO;
import com.aitasker.task_service.dto.ProcrastinationAdviceRequestDTO;
import com.aitasker.task_service.dto.AdviceResponseDTO;
import com.aitasker.task_service.service.AdviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdviceServiceImpl implements AdviceService {
    private final AiServiceClient aiServiceClient;

    @Override
    public AdviceResponseDTO getAntiProcrastinationAdvice(ProcrastinationAdviceRequestDTO request) {
        return aiServiceClient.getAntiProcrastinationAdvice(request);
    }

    @Override
    public AdviceResponseDTO getOptimizationAdvice(OptimizationAdviceRequestDTO request) {
        return aiServiceClient.getOptimizationAdvice(request);
    }

}
