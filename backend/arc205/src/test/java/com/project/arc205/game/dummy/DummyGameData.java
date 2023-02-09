package com.project.arc205.game.dummy;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import java.util.Map;
import java.util.UUID;

public class DummyGameData {

    public static GameData getTestGameDataWithGameCharacter(
            Map<String, GameCharacter> gameCharacterMap) {
        return GameData.of(UUID.randomUUID(), new GameSetting(), gameCharacterMap);
    }

}
