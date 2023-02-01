package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Getter
@Component
public class DummyGame {
    GameData gameData;

    public DummyGame() {
        Map<String, GameCharacter> gameCharacters = new HashMap<>();
        Location loc = new Location(0.0, 0.0);
//        gameCharacters.put("p1", new GameCharacter(Role.CITIZEN, loc));
//        gameCharacters.put("p2", new GameCharacter(Role.CITIZEN, loc));
//        gameCharacters.put("p3", new GameCharacter(Role.MAFIA, loc));
        gameData = new GameData(5, 2, 1, 30, 120, gameCharacters);   //TODO: Get from Room Repo?
    }

}
