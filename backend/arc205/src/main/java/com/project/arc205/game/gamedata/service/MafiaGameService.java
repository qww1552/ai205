package com.project.arc205.game.gamedata.service;

import com.project.arc205.game.gamedata.dto.response.GameStartResponse;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class MafiaGameService implements GameService {

    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;

    @Override
    public GameStartResponse startGame(UUID roomId) {
        Room room = roomRepository.findById(roomId);
        GameData gameData = gameRepository.create(room);
        log.info("create new gameData :: {}", gameData);
        return GameStartResponse.of(roomId.toString());
    }

    @Override
    public GameSetting updateSetting(UUID roomId, GameSetting gameSetting) {
        Room room = roomRepository.findById(roomId);
        // return default
        return room.getGameSetting();
    }
}
