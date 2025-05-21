package com.aitasker.task_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SuggestedBlockDTO {
    @NotNull
    private LocalDate day;

    @NotNull
    private LocalTime start;

    @NotNull
    private LocalTime end;
}
