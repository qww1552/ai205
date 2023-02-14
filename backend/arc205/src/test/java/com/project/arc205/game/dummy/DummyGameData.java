package com.project.arc205.game.dummy;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.room.model.entity.Room;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DummyGameData {

    public static GameData getTestGameDataWithGameCharacter(
            Map<String, GameCharacter> gameCharacterMap) {
        return GameData.of(UUID.randomUUID(), new GameSetting(), gameCharacterMap,
                new Location(0.0, 0.0));
    }

    public static GameData getEmptyTestGameDataFromRoom(Room testRoom) {
        Map<String, GameCharacter> gameCharacters = new HashMap<>();
        String mafiaId = UUID.randomUUID().toString();
        gameCharacters.put(mafiaId, new Mafia(mafiaId, null, 1));
        String citizenId = UUID.randomUUID().toString();
        gameCharacters.put(citizenId, new Citizen(citizenId, null, 1));
        return GameData.of(testRoom.getId(), new GameSetting(), gameCharacters,
                new Location(0.0, 0.0));
    }
}
