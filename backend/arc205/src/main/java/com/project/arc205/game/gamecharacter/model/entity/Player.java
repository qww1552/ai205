package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.room.model.entity.Room;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(of = "id")
public class Player {

    private String id;
    private String sessionId;
    private Room room;
    private GameCharacter gameCharacter;

    public void setRoom(Room room) {
        this.room = room;
    }

    public static Player create(String id, String sessionId) {
        Player player = new Player();
        player.id = id;
        player.sessionId = sessionId;
        return player;
    }
}
