package com.project.arc205.common.exception.custom_exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class ConflictException extends CustomException {
    public ConflictException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
