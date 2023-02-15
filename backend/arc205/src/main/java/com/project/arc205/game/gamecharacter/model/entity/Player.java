package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.room.model.entity.Room;
import java.security.Principal;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.util.StringUtils;

@Getter
@Setter
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
public class Player implements Principal {

    private final String sessionId;
    private String id;
    private Room room;

    public Player(String sessionId) {
        this.sessionId = sessionId;
    }

    public static Player create(String id, String sessionId) {
        if (!StringUtils.hasText(id)) {
            throw new IllegalArgumentException();
        }
        Player player = new Player(sessionId);
        player.id = id;
        return player;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void exit() {
        if (room == null) {
            return;
        }
        room.remove(this);
        this.room = null;
    }

    @Override
    public String getName() {
        return id;
    }
}
