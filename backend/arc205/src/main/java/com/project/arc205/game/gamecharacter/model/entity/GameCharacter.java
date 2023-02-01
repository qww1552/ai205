package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.gamecharacter.model.common.Role;
import com.project.arc205.game.mission.Mission;
import lombok.Getter;

@Getter
public abstract class GameCharacter {

    protected Role role;
    protected Boolean isAlive;
    protected Location location;

    protected GameCharacter(Location location) {
        this.isAlive = true;
        this.location = location;
    }

    public void die() {
        this.isAlive = false;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public abstract void interaction(Mission mission);
}
