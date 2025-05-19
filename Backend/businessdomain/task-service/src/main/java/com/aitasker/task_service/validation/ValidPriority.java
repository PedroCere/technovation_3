package com.aitasker.task_service.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidPriorityValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPriority {

    String message() default "Invalid priority value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
