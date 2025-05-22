package com.aitasker.task_service.validation;

import com.aitasker.task_service.domain.Priority;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.EnumSet;

public class ValidPriorityValidation implements ConstraintValidator<ValidPriority, Priority> {

    @Override
    public boolean isValid(Priority value, ConstraintValidatorContext context) {
        return value != null && EnumSet.allOf(Priority.class).contains(value);
    }
}
