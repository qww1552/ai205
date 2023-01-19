package com.project.arc205.gamecharacter.service;

import com.project.arc205.gamecharacter.dto.receive.Move;
import com.project.arc205.gamecharacter.dto.send.ActionMove;
import com.project.arc205.gamecharacter.operation.Action;
import org.springframework.stereotype.Service;

@Service
public class MoveService {

    public ActionMove move(Move move) {
        return new ActionMove(Action.MOVE, move.getPlayer(), move.getLocation());
    }

}
