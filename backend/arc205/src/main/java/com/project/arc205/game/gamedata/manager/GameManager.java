package com.project.arc205.game.gamedata.manager;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.strategy.GameCharacterAssignStrategy;
import com.project.arc205.game.gamemap.model.entity.GameMap;
import com.project.arc205.game.gamemap.model.repository.GameMapRepository;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import com.project.arc205.game.mission.model.repository.GameMapMissionRepository;
import com.project.arc205.game.room.model.entity.Room;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class GameManager {

    private final GameCharacterAssignStrategy gameCharacterAssignStrategy;
    private final GameMapMissionRepository gameMapMissionRepository;
    private final GameMapRepository gameMapRepository;

    public GameData createGameDataFrom(Room room) {
        GameMap gameMap = gameMapRepository.findById(room.getGameSetting().getGameId())
                .orElseThrow();
        List<GameMapMission> missions = gameMapMissionRepository.findByGamemap(gameMap);
        int numberOfMissions = room.getGameSetting().getNumberOfMissions();

        Map<String, GameCharacter> charactersFromPlayers = gameCharacterAssignStrategy.getCharactersFromPlayers(
                room.getPlayers(), missions, numberOfMissions);

        GameData gameData = GameData.of(room.getId(), room.getGameSetting(), charactersFromPlayers,
                gameMap.getStartLocation());

        return gameData;
    }
}
