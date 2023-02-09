package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.event.Events;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamedata.event.DieEvent;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.Map;
import lombok.Getter;

@Getter
public abstract class GameCharacter {

    protected final String playerId;
    protected Role role;
    protected Boolean isAlive;
    protected Location location;
    protected int color;

    protected Map<String, ActiveMission> missions;

    protected GameCharacter(String playerId, Map<String, ActiveMission> missions, int color) {
        this.playerId = playerId;
        this.isAlive = true;
        this.location = new Location(0.0, 0.0);
        this.missions = missions;
        this.color = color;
    }

    public void die() {
        //TODO: throw Exception when already dead
        this.isAlive = false;
        Events.raise(new DieEvent(playerId));
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public abstract void interaction(String missionId);
}
