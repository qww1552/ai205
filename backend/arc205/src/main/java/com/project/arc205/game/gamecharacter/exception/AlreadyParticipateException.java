package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class AlreadyParticipateException extends ConflictException {

    public AlreadyParticipateException(String playerId) {
        super(playerId + "는 이미 참여 중인 플레이어입니다.");
    }
}
