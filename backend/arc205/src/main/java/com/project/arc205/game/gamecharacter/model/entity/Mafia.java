package com.project.arc205.game.gamecharacter.model.entity;


import com.project.arc205.common.event.Events;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.exception.CannotKillDeadException;
import com.project.arc205.game.gamecharacter.exception.MafiaCannotKillEachOtherException;
import com.project.arc205.game.gamecharacter.exception.MafiaCannotMissionInteractionException;
import com.project.arc205.game.gamedata.event.SabotageEvent;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.Map;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public final class Mafia extends GameCharacter {

    private int killCount = 0;

    public Mafia(String playerId, Map<String, ActiveMission> missions, int color) {
        super(playerId, missions, color);
        this.role = Role.MAFIA;
    }

    public void kill(GameCharacter gameCharacter) {
        if (gameCharacter == null || !gameCharacter.getIsAlive()) {
            throw new CannotKillDeadException();
        }

        if (gameCharacter instanceof Mafia) {
            throw new MafiaCannotKillEachOtherException();
        }
        this.killCount++;
        gameCharacter.die();
    }

    @Override
    public void interaction(String missionId) {
        throw new MafiaCannotMissionInteractionException();
    }

    public void sabotage() {
        log.info("");
        Events.raise(new SabotageEvent(playerId));
    }
}
