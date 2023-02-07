package com.project.arc205.game.dummy;

import com.project.arc205.game.room.model.entity.Room;

public class DummyRoom {

    public static Room createEmptyTestRoom(String title) {
        return Room.create(title, null);
    }
}
