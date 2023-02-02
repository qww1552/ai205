package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.mission.BasicActiveMission;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * players를 순회하며 마지막 player를 마피아로 선출 HashMap은 순서를 보장하지 않으므로 나름 랜덤
 */
public class BasicGameCharacterAssignStrategy implements
        GameCharacterAssignStrategy {

    private final Map<String, Player> players;

    private final Location initialLocation;

    public BasicGameCharacterAssignStrategy(Map<String, Player> players, Location initialLocation) {
        this.players = players;
        this.initialLocation = initialLocation;
    }

    @Override
    public Map<String, GameCharacter> getCharacters() {
        Map<String, GameCharacter> initialGameCharacters = new HashMap<>();
        String mafiaId = "";

        for (String id : players.keySet()) {
            initialGameCharacters.put(id, new Citizen(initialLocation, Map.of(
                    UUID.randomUUID().toString(), new BasicActiveMission())));
            mafiaId = id;
        }

        initialGameCharacters.put(mafiaId, new Mafia(initialLocation, Map.of(
                UUID.randomUUID().toString(), new BasicActiveMission())));

        return initialGameCharacters;
    }
}
