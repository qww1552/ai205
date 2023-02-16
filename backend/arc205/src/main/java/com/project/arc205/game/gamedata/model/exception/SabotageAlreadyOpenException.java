package com.project.arc205.game.gamedata.model.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class SabotageAlreadyOpenException extends
        ConflictException {

    public SabotageAlreadyOpenException(String roomId) {
        super("Game : " + roomId + "에서 이미 사보타지가 실행중입니다.");
    }
}
