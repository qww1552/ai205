package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import lombok.Getter;

@Getter
public final class Citizen extends GameCharacter {

    public Citizen(Location location) {
        super(location);
        this.role = Role.CITIZEN;
    }

    @Override
    public void interaction(String missionId) {
        this.missions.get(missionId).solve();
    }

}
