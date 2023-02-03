package com.project.arc205.game.gamedata.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.game.gamedata.dto.response.GameStartResponse;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.service.GameService;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class GameController {

    private final GameService gameService;

    @MessageMapping("/room/{room-id}/game/start")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<GameStartResponse> start(@DestinationVariable("room-id") String roomId) {

        GameStartResponse response = gameService.startGame(UUID.fromString(roomId));

        return BaseResponse.of(Type.GAME, GameOperation.START, response);
    }

    @MessageMapping("/room/{room-id}/game/setting/update")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<GameSetting> updateSetting(@DestinationVariable("room-id") String roomId,
            @Valid GameSetting gameSetting) {

        GameSetting response = gameService.updateSetting(UUID.fromString(roomId), gameSetting);

        return BaseResponse.of(Type.GAME, GameOperation.SETTING_UPDATE, response);
    }

}
