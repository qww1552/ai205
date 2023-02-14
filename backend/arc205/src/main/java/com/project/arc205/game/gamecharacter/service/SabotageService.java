package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerDto;
import com.project.arc205.game.gamemap.model.repository.GameMapRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class SabotageService {

    private final GameMapRepository gameMapRepository;

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
