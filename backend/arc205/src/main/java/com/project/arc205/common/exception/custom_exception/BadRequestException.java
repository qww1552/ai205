package com.project.arc205.common.exception.custom_exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class BadRequestException extends CustomException {
    public BadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
