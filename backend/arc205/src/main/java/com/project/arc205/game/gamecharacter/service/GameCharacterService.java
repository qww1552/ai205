package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.common.event.Events;
import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.exception.OnlyMafiaCanKillException;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.event.CheckGameEndEvent;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class GameCharacterService {

    private final GameRepository gameRepository;

    public MoveResponse move(UUID roomId, String playerId, Location location) {
        GameData gameData = gameRepository.findById(roomId);

        GameCharacter gameCharacter = gameData.getGameCharacter(playerId);
        gameCharacter.setLocation(location);

        return MoveResponse.builder()
                .playerId(playerId)
                .role(gameCharacter.getRole())
                .isAlive(gameCharacter.getIsAlive())
                .location(gameCharacter.getLocation())
                .build();
    }

    @Transactional
    public void kill(UUID uuid, String mafiaPlayerId, String citizenPlayerId) {
        GameData gameData = gameRepository.findById(uuid);

        GameCharacter gameCharacter = gameData.getGameCharacter(mafiaPlayerId);

        if (!(gameCharacter instanceof Mafia)) {
            throw new OnlyMafiaCanKillException();
        }

        Mafia mafia = (Mafia) gameCharacter;
        Citizen citizen = (Citizen) gameData.getGameCharacter(citizenPlayerId);
        mafia.kill(citizen);
    }

    @Transactional
    public MissionProgressResponse missionComplete(UUID roomId, String playerId, String missionId) {
        GameData gameData = gameRepository.findById(roomId);
        GameCharacter gameCharacter = gameData.getGameCharacter(playerId);
        gameCharacter.interaction(missionId);
        int progress = gameData.incrementAndGetMissionProgress();
        Events.raise(new CheckGameEndEvent(playerId));
        return MissionProgressResponse.of(progress);
    }
}
