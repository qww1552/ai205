package com.project.arc205.game.gamedata.model.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class SabotageNotActiveException extends BadRequestException {

    public SabotageNotActiveException(String roomId) {
        super(roomId + " 게임은 사보타지 진행 중이 아닙니다");
    }
}
