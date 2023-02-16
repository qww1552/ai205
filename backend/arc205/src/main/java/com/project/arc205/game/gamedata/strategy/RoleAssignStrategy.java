package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.common.model.Role;

public interface RoleAssignStrategy {

    void init(int numberOfPlayers);

    Role next();
}
