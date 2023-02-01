package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.mission.ActiveMission;
import lombok.Getter;

import java.util.Map;

@Getter
public final class Citizen extends GameCharacter {

    public Citizen(Location location, Map<String, ActiveMission> missions) {
        super(location, missions);
        this.role = Role.CITIZEN;
    }

    @Override
    public void interaction(String missionId) {
        this.missions.get(missionId).solve();
    }

}
