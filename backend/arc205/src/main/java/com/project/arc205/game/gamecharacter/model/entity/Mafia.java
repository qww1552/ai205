package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.exception.MafiaCannotKillEachOtherException;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.Map;
import lombok.Getter;

@Getter
public final class Mafia extends GameCharacter {

    private int killCount = 0;

    public Mafia(String playerId, Map<String, ActiveMission> missions, int color) {
        super(playerId, missions, color);
        this.role = Role.MAFIA;
    }

    public void kill(GameCharacter gameCharacter) {
        if (gameCharacter instanceof Mafia) {
            throw new MafiaCannotKillEachOtherException();
        }
        this.killCount++;
        gameCharacter.die();
    }

    @Override
    public void interaction(String missionId) {
        // do nothing
    }
}
