package com.project.arc205.game.gamecharacter.service;

import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerResponse;
import com.project.arc205.game.gamecharacter.operation.Action;
import org.springframework.stereotype.Service;

@Service
public class MoveService {

    public MoveResponse move(MoveRequest moveRequest) {
        return new MoveResponse(Action.MOVE, new PlayerResponse(moveRequest.getPlayerRequest().getId()), moveRequest.getLocation());
    }

}
