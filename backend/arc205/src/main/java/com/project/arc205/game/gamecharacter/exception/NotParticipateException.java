package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class NotParticipateException extends BadRequestException {

    public NotParticipateException(String playerId) {
        super(playerId + "는 참여 중인 플레이어가 아닙니다.");
    }
}
