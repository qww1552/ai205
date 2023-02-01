package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.exception.MafiaCannotKillEachOtherException;
import com.project.arc205.game.mission.ActiveMission;
import lombok.Getter;

import java.util.Map;

@Getter
public final class Mafia extends GameCharacter {
    private int killCount = 0;

    public Mafia(Location location, Map<String, ActiveMission> missions) {
        super(location, missions);
        this.role = Role.MAFIA;
    }

    public void kill(GameCharacter gameCharacter) {
        if (gameCharacter instanceof Mafia) throw new MafiaCannotKillEachOtherException();
        this.killCount++;
        gameCharacter.die();
    }

    @Override
    public void interaction(String missionId) {
        // do nothing
    }
}
