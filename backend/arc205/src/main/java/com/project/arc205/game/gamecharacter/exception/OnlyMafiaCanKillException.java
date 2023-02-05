package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class OnlyMafiaCanKillException extends BadRequestException {

    public OnlyMafiaCanKillException() {
        super("살해는 마피아만 할 수 있습니다.");
    }
}
