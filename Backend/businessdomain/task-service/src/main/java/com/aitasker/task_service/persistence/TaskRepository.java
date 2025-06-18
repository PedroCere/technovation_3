package com.aitasker.task_service.persistence;

import com.aitasker.task_service.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByDueDate(LocalDate dueDate);

    List<Task> findByUserId(Long userId);

    List<Task> findByDueDateAndUserId(LocalDate dueDate, Long userId);

    java.util.Optional<Task> findByIdAndUserId(Long id, Long userId);
}
