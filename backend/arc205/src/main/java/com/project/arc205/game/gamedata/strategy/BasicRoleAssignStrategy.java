package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.common.model.Role;
import org.springframework.stereotype.Component;

@Component
public class BasicRoleAssignStrategy implements RoleAssignStrategy {

    private int numberOfPlayers = 0;
    private int i = 0;

    public void init(int numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
        i = 0;
    }

    public Role next() {
        if (++i == numberOfPlayers) {
            return Role.MAFIA;
        }
        return Role.CITIZEN;
    }
}
