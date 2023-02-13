package com.project.arc205.game.gamedata.strategy;

import static java.util.stream.Collectors.toMap;

import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.mission.model.ActiveMission;
import com.project.arc205.game.mission.model.BasicActiveMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Component;

/**
 * players를 순회하며 마지막 player를 마피아로 선출 HashMap은 순서를 보장하지 않으므로 나름 랜덤
 */
@Component
public class BasicGameCharacterAssignStrategy implements
        GameCharacterAssignStrategy {

    @Override
    public Map<String, GameCharacter> getCharactersFromPlayers(Map<String, Player> players,
            List<GameMapMission> missions, int numberOfMissions) {
        Map<String, GameCharacter> initialGameCharacters = new HashMap<>();
        String mafiaId = "";
        AtomicInteger colorIdx = new AtomicInteger();   //assign gameCharacter color in order

        for (Player player : players.values()) {
            String playerId = player.getId();
            List<GameMapMission> missionCombi = randomCombination(missions, numberOfMissions);
            Map<String, ActiveMission> individualMissions = missionCombi.stream().collect(
                    toMap(m -> m.getMission().getId().toString(), BasicActiveMission::of,
                            (a, b) -> b, ConcurrentHashMap::new));

            initialGameCharacters.put(playerId,
                    new Citizen(playerId, individualMissions, colorIdx.getAndIncrement()));
            mafiaId = playerId;
        }
        var deletedCitizen = initialGameCharacters.get(mafiaId);
        initialGameCharacters.put(mafiaId,
                new Mafia(mafiaId, deletedCitizen.getMissions(), deletedCitizen.getColor()));

        return initialGameCharacters;
    }

    private <T> List<T> randomCombination(List<T> list, int size) {
        Collections.shuffle(list);
        return list.subList(0, size);
    }
}
