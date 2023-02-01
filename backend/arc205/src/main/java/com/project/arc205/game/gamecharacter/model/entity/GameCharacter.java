package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.mission.ActiveMission;
import lombok.Getter;

import java.util.Map;

@Getter
public abstract class GameCharacter {

    protected Role role;
    protected Boolean isAlive;
    protected Location location;

    protected Map<String, ActiveMission> missions;

    protected GameCharacter(Location location, Map<String, ActiveMission> missions) {
        this.isAlive = true;
        this.location = location;
        this.missions = missions;
    }

    public void die() {
        this.isAlive = false;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public abstract void interaction(String missionId);
}
