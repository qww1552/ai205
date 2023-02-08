package com.project.arc205.game.gamedata.repository;

import com.project.arc205.common.Constant;
import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.model.exception.GameAlreadyExistException;
import com.project.arc205.game.gamedata.model.exception.GameNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class GameRepository {

    private final ConcurrentHashMap<UUID, GameData> gameStorage = new ConcurrentHashMap<>();

    public void save(UUID roomId, GameData gameData) {
        if (gameStorage.containsKey(roomId)) {
            throw new GameAlreadyExistException(roomId.toString());
        }
        gameStorage.put(roomId, gameData);
    }

    public GameData findById(UUID id) {
        if (!gameStorage.containsKey(id)) {
            throw new GameNotFoundException(id.toString());
        }
        return gameStorage.get(id);
    }

}