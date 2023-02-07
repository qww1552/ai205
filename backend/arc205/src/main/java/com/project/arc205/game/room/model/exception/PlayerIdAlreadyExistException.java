package com.project.arc205.game.room.model.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class PlayerIdAlreadyExistException extends
        ConflictException {

    public PlayerIdAlreadyExistException(String playerId) {
        super("\"" + playerId + "\" 가 이미 존재합니다.");

    }
}
