package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.dto.response.KillBroadcastResponse;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.exception.OnlyMafiaCanKillException;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class GameCharacterService {

    private final GameRepository gameRepository;

    public MoveResponse move(UUID roomId, String playerId, Location location) {
        GameData gameData = gameRepository.findById(roomId);

        GameCharacter gameCharacter = gameData.getGameCharacters().get(playerId);
        gameCharacter.setLocation(location);

        return MoveResponse.builder()
                .playerId(playerId)
                .role(gameCharacter.getRole())
                .isAlive(gameCharacter.getIsAlive())
                .location(gameCharacter.getLocation())
                .build();
    }

    public KillBroadcastResponse kill(UUID uuid, String mafiaPlayerId, String citizenPlayerId) {
        GameData gameData = gameRepository.findById(uuid);
        Map<String, GameCharacter> gameCharacters = gameData.getGameCharacters();

        GameCharacter gameCharacter = gameCharacters.get(mafiaPlayerId);

        if (!(gameCharacter instanceof Mafia)) {
            throw new OnlyMafiaCanKillException();
        }

        Mafia mafia = (Mafia) gameCharacter;
        Citizen citizen = (Citizen) gameCharacters.get(citizenPlayerId);
        mafia.kill(citizen);

        KillBroadcastResponse.Player playerResponse = KillBroadcastResponse.Player.of(
                citizenPlayerId,
                citizen.getRole().name(), citizen.getIsAlive());

        return new KillBroadcastResponse(playerResponse, citizen.getLocation());
    }
}
