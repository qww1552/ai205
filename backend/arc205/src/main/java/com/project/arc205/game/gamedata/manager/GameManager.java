package com.project.arc205.game.gamedata.manager;

import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.strategy.ColorAssignStrategy;
import com.project.arc205.game.gamedata.strategy.MissionDistributionStrategy;
import com.project.arc205.game.gamedata.strategy.RoleAssignStrategy;
import com.project.arc205.game.gamemap.model.entity.GameMap;
import com.project.arc205.game.gamemap.model.repository.GameMapRepository;
import com.project.arc205.game.mission.model.ActiveMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import com.project.arc205.game.mission.model.repository.GameMapMissionRepository;
import com.project.arc205.game.room.model.entity.Room;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Setter
@AllArgsConstructor
@Component
public class GameManager {

    private final GameMapMissionRepository gameMapMissionRepository;
    private final GameMapRepository gameMapRepository;
    private RoleAssignStrategy roleAssignStrategy;
    private MissionDistributionStrategy missionDistributionStrategy;
    private ColorAssignStrategy colorAssignStrategy;

    public GameData createGameDataFrom(Room room) {
        GameSetting gameSetting = room.getGameSetting();
        GameMap gameMap = gameMapRepository.findById(gameSetting.getGameId())
                .orElseThrow();
        List<GameMapMission> missions = gameMapMissionRepository.findByGamemap(gameMap);
        int numberOfMissions = gameSetting.getNumberOfMissions();

        roleAssignStrategy.init(room.getPlayers().size());
        missionDistributionStrategy.init(missions, numberOfMissions);
        colorAssignStrategy.init();

        Map<String, GameCharacter> charactersFromPlayers = createGameCharacter(room.getPlayers());

        GameData gameData = GameData.of(room.getId(), gameSetting, charactersFromPlayers,
                gameMap.getStartLocation());

        gameData.getSabotage().setCoolTime(gameSetting.getSabotageCoolTime() * 1000L);
        
        return gameData;
    }

    private Map<String, GameCharacter> createGameCharacter(Map<String, Player> players) {
        Map<String, GameCharacter> gameCharacters = new HashMap<>();

        for (Player player : players.values()) {
            String playerId = player.getId();
            GameCharacter gameCharacter;
            Role role = roleAssignStrategy.next();
            Map<String, ActiveMission> missions = missionDistributionStrategy.next();
            int color = colorAssignStrategy.next();
            if (role == Role.CITIZEN) {
                gameCharacter = new Citizen(playerId, missions, color);
            } else {
                gameCharacter = new Mafia(playerId, missions, color);
            }
            gameCharacters.put(playerId, gameCharacter);
        }
        return gameCharacters;
    }
}
