package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class DeadCharacterException extends BadRequestException {

    public DeadCharacterException(String playerId) {
        super(playerId + " 는 죽은 플레이어입니다.");
    }
}
