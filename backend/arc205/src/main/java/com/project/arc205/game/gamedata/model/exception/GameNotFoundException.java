package com.project.arc205.game.gamedata.model.exception;

import com.project.arc205.common.exception.custom_exception.NotFoundException;

public class GameNotFoundException extends NotFoundException {

    public GameNotFoundException(String roomId) {
        super("'roomId: " + roomId + "' 게임은 존재하지 않습니다.");
    }
}
