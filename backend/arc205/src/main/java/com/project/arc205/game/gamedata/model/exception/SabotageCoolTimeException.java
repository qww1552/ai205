package com.project.arc205.game.gamedata.model.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class SabotageCoolTimeException extends
        BadRequestException {

    public SabotageCoolTimeException(String roomId) {
        super("Game : " + roomId + " 사보타지 쿨타임입니다.");
    }
}
