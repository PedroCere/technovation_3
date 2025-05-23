package com.aitasker.task_service.persistence;

import com.aitasker.task_service.domain.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTaskRepository extends JpaRepository<SubTask,Long> {
    List<SubTask> findByTaskId(Long taskId);
}
