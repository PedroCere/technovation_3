package com.aitasker.task_service.service;

import com.aitasker.task_service.dto.ProcrastinationAdviceRequestDTO;
import com.aitasker.task_service.dto.ProcrastinationAdviceResponseDTO;

public interface AdviceService {

    ProcrastinationAdviceResponseDTO getAntiProcrastinationAdvice(ProcrastinationAdviceRequestDTO request);

}
