package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class CannotKillDeadException extends BadRequestException {

    public CannotKillDeadException() {
        super("이미 죽은 사람을 죽일 수 없습니다.");
    }
}
