package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.NotFoundException;

public class MissionNotFoundException extends NotFoundException {

    public MissionNotFoundException(String missionId) {
        super(missionId + " 미션이 존재하지 않습니다.");
    }
}
