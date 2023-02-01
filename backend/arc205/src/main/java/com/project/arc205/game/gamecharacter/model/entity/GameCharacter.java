package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.mission.ActiveMission;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public abstract class GameCharacter {

    protected Role role;
    protected Boolean isAlive;
    protected Location location;

    protected Map<String, ActiveMission> missions;

    protected GameCharacter(Location location) {
        this.isAlive = true;
        this.location = location;
        this.missions = new HashMap<>();
    }

    public void die() {
        this.isAlive = false;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void addMission(String missionId, ActiveMission mission) {
        this.missions.put(missionId, mission);
    }

    public abstract void interaction(String missionId);
}
