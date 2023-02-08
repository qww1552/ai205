package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Role;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.Map;
import lombok.Getter;

@Getter
public final class Citizen extends GameCharacter {

    public Citizen(String playerId, Map<String, ActiveMission> missions) {
        super(playerId, missions);
        this.role = Role.CITIZEN;
    }

    @Override
    public void interaction(String missionId) {
        this.missions.get(missionId).solve();
    }

}
