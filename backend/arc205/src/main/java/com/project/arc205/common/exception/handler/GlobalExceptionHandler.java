package com.project.arc205.common.exception.handler;

import com.project.arc205.common.dto.ExceptionResponse;
import com.project.arc205.common.exception.custom_exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @MessageExceptionHandler(CustomException.class)
    @SendToUser("/queue")
    public ExceptionResponse handleException(CustomException e) {
//        log.info("exception: {}", e.getMessage());
        return ExceptionResponse.of(e);
    }

    @MessageExceptionHandler(MethodArgumentNotValidException.class)
    @SendToUser("/queue")
    public ExceptionResponse handleArgumentNotValidException(Exception e) {
        return ExceptionResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
