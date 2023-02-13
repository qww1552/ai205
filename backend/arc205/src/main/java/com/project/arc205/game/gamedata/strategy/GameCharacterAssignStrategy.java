package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.List;
import java.util.Map;

public interface GameCharacterAssignStrategy {

    Map<String, GameCharacter> getCharactersFromPlayers(Map<String, Player> players,
            List<GameMapMission> missions, int numberOfMissions);

}
