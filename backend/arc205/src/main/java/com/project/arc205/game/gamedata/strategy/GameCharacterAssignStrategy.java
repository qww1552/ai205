package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import java.util.Map;

public interface GameCharacterAssignStrategy {

    Map<String, GameCharacter> getCharactersFromPlayers(Map<String, Player> players);
}
