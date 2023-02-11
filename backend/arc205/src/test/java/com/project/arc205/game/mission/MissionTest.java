package com.project.arc205.game.mission;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.manager.GameManager;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.strategy.BasicGameCharacterAssignStrategy;
import com.project.arc205.game.room.model.entity.Room;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MissionTest {

    private GameData gameData;

    private Player getPlayerOf(String name) {
        return Player.create(name, name);
    }

    @BeforeEach
    void init() {
        GameManager gameManager = new GameManager(new BasicGameCharacterAssignStrategy());
        Room room = Room.create("testRoom", getPlayerOf("p1"));
        room.enter(getPlayerOf("p2"));
        room.enter(getPlayerOf("p3"));
        room.enter(getPlayerOf("p4"));
        gameData = gameManager.createGameDataFrom(room);
    }

    @Test
    void missionTest() {
        int progress = gameData.getMissionProgress();
        assertThat(progress, equalTo(0));
    }

}
