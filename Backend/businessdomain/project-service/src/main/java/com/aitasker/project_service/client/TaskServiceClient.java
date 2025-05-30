package com.aitasker.project_service.client;

import com.aitasker.project_service.dto.TaskResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "task-service", url = "http://localhost:8083")
public interface TaskServiceClient {

    @GetMapping("/tasks/by-project")
    List<TaskResponseDTO> getTasksByProjectId(@RequestParam("projectId") Long projectId);
}
