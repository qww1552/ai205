package com.project.arc205.game.gamecharacter.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.service.MoveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MoveController {

    private final MoveService moveService;

    @MessageMapping("/room/{room-id}/move")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<MoveResponse> move(MoveRequest moveRequest) {
        log.info("전달 받은 move : {}", moveRequest);
        return BaseResponse.of(Type.CHARACTER, CharacterOperation.MOVE, moveService.move(moveRequest));
    }
}
