package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerResponse;
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

    public MoveResponse move(MoveRequest moveRequest) {
        String playerId = moveRequest.getPlayerRequest().getId();
        PlayerResponse playerResponse = new PlayerResponse(playerId);
        Location location = moveRequest.getLocation();
        return new MoveResponse(playerResponse, location);
    }

    public void kill(UUID uuid, String mafiaSessionId, String to) {
        GameData gameData = gameRepository.findById(uuid);
        Map<String, GameCharacter> gameCharacters = gameData.getGameCharacters();

        GameCharacter gameCharacter = gameCharacters.get(mafiaSessionId);

        if (!(gameCharacter instanceof Mafia))
            throw new RuntimeException(); // TODO: 2023-02-03 define exception

        Mafia mafia = (Mafia) gameCharacter;
        Citizen citizen = (Citizen) gameCharacters.get(to);
        mafia.kill(citizen);
    }
}
