package com.project.arc205.common.dto;

import com.project.arc205.common.exception.custom_exception.CustomException;
import com.project.arc205.common.operation.Type;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ExceptionResponse {
    private final Type type;
    private final HttpStatus status;
    private final String message;

    private ExceptionResponse(HttpStatus status) {
        this.type = Type.EXCEPTION;
        this.status = status;
        this.message = null;
    }

    private ExceptionResponse(HttpStatus status, String message) {
        this.type = Type.EXCEPTION;
        this.status = status;
        this.message = message;
    }

    static public ExceptionResponse of(HttpStatus status, String message) {
        return new ExceptionResponse(status, message);
    }
    static public ExceptionResponse of(CustomException ex) {
        return new ExceptionResponse(ex.getStatus(), ex.getMessage());
    }
}
