package com.project.arc205.game.dummy;

import com.project.arc205.game.gamecharacter.model.entity.Player;

public class DummyPlayer {

    public static Player of(String name) {
        return Player.create(name, name);
    }

    /**
     * 이름이 세션아이디와 같은 player 객체
     *
     * @param sessionId
     * @return Player
     */
    public static Player getTestPlayer(String sessionId) {
        return Player.create(sessionId, sessionId);
    }
}
