package com.project.arc205.common.exception.handler;

import com.project.arc205.common.dto.ExceptionResponse;
import com.project.arc205.common.exception.customException.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Controller
public class BaseExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ExceptionResponse handleBadRequest(CustomException e) {
        e.printStackTrace();
        return ExceptionResponse.of(e);
    }
}
