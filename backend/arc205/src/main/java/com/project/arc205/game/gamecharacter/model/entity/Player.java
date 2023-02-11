package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.room.model.entity.Room;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.security.Principal;

@Getter
@Setter
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
public class Player implements Principal {

    private String id;
    private String sessionId;
    private Room room;

    public static Player create(String id, String sessionId) {
        Player player = new Player();
        player.id = id;
        player.sessionId = sessionId;
        return player;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void exit() {
        room.remove(this);
        this.room = null;
    }

    @Override
    public String getName() {
        return id;
    }
}
