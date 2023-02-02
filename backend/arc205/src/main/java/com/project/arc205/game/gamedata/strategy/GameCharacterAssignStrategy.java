package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import java.util.Map;

public interface GameCharacterAssignStrategy {

    Map<String, GameCharacter> getCharacters();
}
