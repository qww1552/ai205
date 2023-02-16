package com.project.arc205.game.meeting.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class AlreadyInMeetingException extends ConflictException {
    public AlreadyInMeetingException() {
        super("이미 회의 중입니다");
    }
}
