package com.aitasker.task_service.client;

import com.aitasker.task_service.domain.Task;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "ai-service", url = "http://localhost:8082")
public interface AiServiceClient {

    @PostMapping("/ai/prioritize")
    void recalculatePriority(@RequestBody List<Task> tasks);
}
