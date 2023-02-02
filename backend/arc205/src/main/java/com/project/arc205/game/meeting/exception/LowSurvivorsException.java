package com.project.arc205.game.meeting.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class LowSurvivorsException extends BadRequestException {
    public LowSurvivorsException() {
        super("최소 생존자 수는 3명 이상이어야 합니다.");
    }
}
