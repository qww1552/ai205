package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerDto;
import com.project.arc205.game.gamecharacter.exception.OnlyMafiaCanSabotageException;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.Sabotage;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class SabotageService {

    private final GameRepository gameRepository;


    @Transactional
    public void sabotage(UUID roomId, String requestPlayerId) {
        GameData gameData = gameRepository.findById(roomId);
        GameCharacter gameCharacter = gameData.getGameCharacter(requestPlayerId);

        if (!(gameCharacter instanceof Mafia)) {
            throw new OnlyMafiaCanSabotageException();
        }

        Mafia mafia = (Mafia) gameCharacter;
        mafia.sabotage();
    }

    public PlayerDto join(UUID roomId, String playerId) {
        //TODO
        return PlayerDto.of(playerId);
    }

    public PlayerDto leave(UUID roomId, String playerId) {
        //TODO
        return PlayerDto.of(playerId);
    }

    public MissionProgressResponse solve(UUID roomId, String playerId) {
        //TODO
        int progress = 0;
        return MissionProgressResponse.of(progress);
    }

}
