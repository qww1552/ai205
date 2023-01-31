package com.project.arc205.game.meeting.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class InvalidTargetException extends BadRequestException {
    public InvalidTargetException(String target) {
        super(target + "은 유효하지 않은 투표 대상입니다.");
    }
}
