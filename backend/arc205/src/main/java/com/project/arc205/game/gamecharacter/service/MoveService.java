package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerResponse;
import com.project.arc205.game.gamecharacter.model.common.Location;
import org.springframework.stereotype.Service;

@Service
public class MoveService {

    public MoveResponse move(MoveRequest moveRequest) {
        String playerId = moveRequest.getPlayerRequest().getId();
        PlayerResponse playerResponse = new PlayerResponse(playerId);
        Location location = moveRequest.getLocation();
        return new MoveResponse(playerResponse, location);
    }

}
