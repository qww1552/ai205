package com.project.arc205.game.gamedata.service;

import com.project.arc205.game.gamedata.dto.response.GameStartResponse;
import java.util.UUID;

public interface GameService {

    GameStartResponse startGame(UUID roomId);
}
