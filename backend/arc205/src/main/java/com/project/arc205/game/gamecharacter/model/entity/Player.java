package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.room.model.entity.Room;
import lombok.Getter;

@Getter
public class Player {

    private Long id;
    private String name;
    private Room room;
    private GameCharacter gameCharacter;

    public void die() {
        this.gameCharacter.die();
    }

    public boolean isAlive() {
        return this.gameCharacter.getIsAlive();
    }

    public void moveTo(Location location) {
        gameCharacter.setLocation(location);
    }
}
