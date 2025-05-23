package com.aitasker.task_service.service;

import com.aitasker.task_service.dto.OptimizationAdviceRequestDTO;
import com.aitasker.task_service.dto.ProcrastinationAdviceRequestDTO;
import com.aitasker.task_service.dto.AdviceResponseDTO;

public interface AdviceService {

    AdviceResponseDTO getAntiProcrastinationAdvice(ProcrastinationAdviceRequestDTO request);

    AdviceResponseDTO getOptimizationAdvice(OptimizationAdviceRequestDTO request);

}
