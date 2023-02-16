package com.project.arc205.game.gamecharacter.exception;

import com.project.arc205.common.exception.custom_exception.ConflictException;

public class AlreadySolvedMissionException extends ConflictException {

    public AlreadySolvedMissionException(String missionId) {
        super(missionId + " 은 이미 해결된 미션입니다.");
    }
}
