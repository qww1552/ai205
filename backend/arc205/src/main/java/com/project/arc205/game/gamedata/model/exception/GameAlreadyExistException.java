package com.project.arc205.game.gamedata.model.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class GameAlreadyExistException extends
        ConflictException {

    public GameAlreadyExistException(String roomId) {
        super("Room(" + roomId + ")" + "에 게임이 이미 존재합니다.");
    }
}
