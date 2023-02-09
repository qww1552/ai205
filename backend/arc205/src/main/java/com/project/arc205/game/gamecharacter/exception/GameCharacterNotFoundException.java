package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.NotFoundException;

public class GameCharacterNotFoundException extends NotFoundException {

    public GameCharacterNotFoundException() {
        super("캐릭터가 존재하지 않습니다.");
    }
}
