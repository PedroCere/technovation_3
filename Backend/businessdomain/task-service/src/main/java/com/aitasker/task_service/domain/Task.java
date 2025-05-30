package com.aitasker.task_service.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = true)
    private String title;
    @Column(name = "project_id")
    private Long projectId;
    @Column(nullable = true)
    private String description;
    @Column(nullable = true)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Column(nullable = true)
    private boolean completed;
    @Column(nullable = true)
    private Double importanceScore; // Calculado por IA
    @Column(nullable = true)
    private String suggestedTimeBlock; // Sugerido por IA
    @Column(nullable = true)
    @OneToMany(mappedBy = "task", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SubTask> subtasks;
    @Column(nullable = true)
    private LocalDate recommendedDay;
    @Column(nullable = true)
    private LocalTime startTime;
    @Column(nullable = true)
    private LocalTime endTime;

}
