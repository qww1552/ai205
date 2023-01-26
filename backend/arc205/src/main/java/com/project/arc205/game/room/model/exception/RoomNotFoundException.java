package com.project.arc205.game.room.model.exception;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException() {
        super("room not found");
    }
}
