package com.aitasker.task_service.service;

import com.aitasker.task_service.dto.SubTaskDTO;

public interface SubTaskService {
    SubTaskDTO createSubTask(Long taskId, SubTaskDTO subTaskDTO);
    SubTaskDTO updateSubTask(Long taskId, Long subtaskId, SubTaskDTO subTaskDTO);
    void deleteSubTask(Long taskId, Long subtaskId);
}
