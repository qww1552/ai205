package com.project.arc205.game.gamedata.manager;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.strategy.GameCharacterAssignStrategy;
import com.project.arc205.game.room.model.entity.Room;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class GameManager {

    private final GameCharacterAssignStrategy gameCharacterAssignStrategy;

    public GameData createGameDataFrom(Room room) {
        Map<String, GameCharacter> charactersFromPlayers = gameCharacterAssignStrategy.getCharactersFromPlayers(
                room.getPlayers());

        GameData gameData = GameData.of(room.getGameSetting(),
                charactersFromPlayers);

        return gameData;
    }
}
