package com.project.arc205.game.gamecharacter.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamecharacter.dto.response.PlayerDto;
import com.project.arc205.game.gamecharacter.service.SabotageService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
@MessageMapping("/room/{room-id}/character/sabotage")
public class SabotageController {

    private final SabotageService sabotageService;

    @MessageMapping("/join")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<PlayerDto> join(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor) {
        UUID uuidRoomId = UUID.fromString(roomId);
        String playerId = WebSocketUtil.getPlayerIdFromHeader(accessor);
        log.info("/room/{}/sabotage/join: {}", roomId, playerId);

        PlayerDto response = sabotageService.join(uuidRoomId, playerId);
        return BaseResponse.character(CharacterOperation.SABOTAGE_JOIN).data(response);
    }

    @MessageMapping("/leave")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<PlayerDto> leave(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor) {
        UUID uuidRoomId = UUID.fromString(roomId);
        String playerId = WebSocketUtil.getPlayerIdFromHeader(accessor);
        log.info("/room/{}/sabotage/leave: {}", roomId, playerId);

        PlayerDto response = sabotageService.leave(uuidRoomId, playerId);
        return BaseResponse.character(CharacterOperation.SABOTAGE_LEAVE).data(response);
    }

    @MessageMapping("/solve")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<MissionProgressResponse> solve(
            @DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor) {
        UUID uuidRoomId = UUID.fromString(roomId);
        String playerId = WebSocketUtil.getPlayerIdFromHeader(accessor);
        log.info("/room/{}/sabotage/solve: {}", roomId, playerId);

        MissionProgressResponse response = sabotageService.solve(uuidRoomId, playerId);
        return BaseResponse.character(CharacterOperation.SABOTAGE_SOLVE).data(response);
    }
}
