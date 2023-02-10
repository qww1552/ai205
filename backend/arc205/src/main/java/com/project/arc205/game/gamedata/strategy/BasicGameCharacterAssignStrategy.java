package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.mission.model.BasicActiveMission;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Component;

/**
 * players를 순회하며 마지막 player를 마피아로 선출 HashMap은 순서를 보장하지 않으므로 나름 랜덤
 */
@Component
public class BasicGameCharacterAssignStrategy implements
        GameCharacterAssignStrategy {

    @Override
    public Map<String, GameCharacter> getCharactersFromPlayers(Map<String, Player> players) {
        Map<String, GameCharacter> initialGameCharacters = new HashMap<>();
        String mafiaId = "";
        AtomicInteger colorIdx = new AtomicInteger();   //assign gameCharacter color in order

        for (Player player : players.values()) {
            String playerId = player.getId();
            initialGameCharacters.put(playerId, new Citizen(playerId,
                    Map.of(UUID.randomUUID().toString(),
                            new BasicActiveMission("1", "m1", new Location(1.1, 1.1))),
                    colorIdx.getAndIncrement()));
            mafiaId = playerId;
        }

        initialGameCharacters.put(mafiaId, new Mafia(mafiaId,
                Map.of(UUID.randomUUID().toString(),
                        new BasicActiveMission("1", "m1", new Location(1.1, 1.1))),
                colorIdx.decrementAndGet()));

        return initialGameCharacters;
    }
}
