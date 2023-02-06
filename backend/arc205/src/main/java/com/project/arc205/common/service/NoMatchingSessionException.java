package com.project.arc205.common.service;

import com.project.arc205.common.exception.custom_exception.NotFoundException;

public class NoMatchingSessionException extends
        NotFoundException {

    public NoMatchingSessionException() {
        super("세션이 존재하지 않습니다.");
    }
}
