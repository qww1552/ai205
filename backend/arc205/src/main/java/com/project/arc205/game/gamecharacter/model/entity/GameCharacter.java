package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.gamecharacter.model.common.Role;
import com.project.arc205.game.gamecharacter.model.common.Location;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameCharacter {

    private Role role;
    private Boolean isAlive;
    private Location location;

    public void die() {
        this.isAlive = false;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
