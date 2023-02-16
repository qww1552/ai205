package com.project.arc205.game.meeting.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class NotVotingPeriodException extends BadRequestException {
    public NotVotingPeriodException() {
        super("투표 기간이 아닙니다");
    }
}
