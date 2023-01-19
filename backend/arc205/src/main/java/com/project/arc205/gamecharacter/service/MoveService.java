package com.project.arc205.gamecharacter.service;

import com.project.arc205.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.gamecharacter.operation.Action;
import org.springframework.stereotype.Service;

@Service
public class MoveService {

    public MoveResponse move(MoveRequest moveRequest) {
        return new MoveResponse(Action.MOVE, moveRequest.getPlayer(), moveRequest.getLocation());
    }

}
