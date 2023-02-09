package com.project.arc205.game.gamedata.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamedata.dto.response.GameStartPersonalResponse;
import com.project.arc205.game.gamedata.dto.response.GameStartResponse;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.service.GameService;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class GameController {

    private final GameService gameService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/room/{room-id}/game/start")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<GameStartResponse> start(@DestinationVariable("room-id") String roomIdStr) {
        UUID roomId = UUID.fromString(roomIdStr);

        GameStartResponse response = gameService.startGame(roomId);

        List<GameStartPersonalResponse> personalResponses = gameService.getPersonalInfo(roomId);
        personalResponses.forEach(
                res -> {
                    log.info("/game/start_info/{}", res.getSessionId());
                    template.convertAndSendToUser(res.getSessionId(), "/queue",
                            BaseResponse.game(GameOperation.START_PERSONAL).data(res),
                            WebSocketUtil.createHeaders(res.getSessionId()));
                });
        return BaseResponse.game(GameOperation.START).data(response);
    }

    @MessageMapping("/room/{room-id}/game/setting/update")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<GameSetting> updateSetting(@DestinationVariable("room-id") String roomId,
            @Valid GameSetting gameSetting) {

        GameSetting response = gameService.updateSetting(UUID.fromString(roomId), gameSetting);

        return BaseResponse.game(GameOperation.SETTING_UPDATE).data(response);
    }
}

