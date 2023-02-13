package com.project.arc205.game.dummy;

import com.project.arc205.game.gamecharacter.model.entity.Player;

public class DummyPlayer {

    public static Player of(String name) {
        return Player.create(name, name);
    }
}
