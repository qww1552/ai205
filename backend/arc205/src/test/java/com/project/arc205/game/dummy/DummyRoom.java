package com.project.arc205.game.dummy;

import com.project.arc205.game.room.model.entity.Room;
import java.util.stream.IntStream;

public class DummyRoom {

    public static Room createEmptyTestRoom(String title) {
        return Room.create(title, null);
    }

    public static Room createTestRoom(String title, int n) {
        Room room = Room.create(title, null);
        IntStream.range(1, n + 1).mapToObj(i -> DummyPlayer.of("p" + i)).forEach(room::enter);
        return room;
    }
}
