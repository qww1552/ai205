package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.gamecharacter.model.common.Role;
import com.project.arc205.game.mission.Mission;
import lombok.Getter;

@Getter
public final class Citizen extends GameCharacter{

    public Citizen(Location location) {
        super(location);
        this.role = Role.CITIZEN;
    }

    @Override
    public void interaction(Mission mission) {
        mission.solve();
    }

}
