package com.project.arc205.game.meeting.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class AlreadyVotedException extends ConflictException {
    public AlreadyVotedException() {
        super("이미 투표한 플레이어입니다.");
    }
}
