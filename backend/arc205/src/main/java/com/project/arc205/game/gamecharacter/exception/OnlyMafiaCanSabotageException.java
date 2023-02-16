package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class OnlyMafiaCanSabotageException extends
        BadRequestException {

    public OnlyMafiaCanSabotageException() {
        super("마피아만 할 수 있는 동작입니다.");
    }
}
