package com.aitasker.task_service.exception;

public class TaskNotFoundException extends RuntimeException{

    public TaskNotFoundException(Long id) {
        super("Task not found with ID: " + id);
    }
}
