package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class MafiaCannotKillEachOtherException extends BadRequestException {
    public MafiaCannotKillEachOtherException() {
        super("마피아는 서로를 죽일 수 없습니다.");
    }
}
