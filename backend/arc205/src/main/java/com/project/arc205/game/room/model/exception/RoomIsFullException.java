package com.project.arc205.game.room.model.exception;

import com.project.arc205.common.exception.custom_exception.BadRequestException;

public class RoomIsFullException extends
        BadRequestException {

    public RoomIsFullException(String roomId) {
        super(roomId + " 에 남은 자리가 없습니다.");
    }
}
