package com.project.arc205.game.gamecharacter.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.dto.request.MissionRequest;
import com.project.arc205.game.gamecharacter.dto.response.MissionCompleteResponse;
import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamecharacter.service.GameCharacterService;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
@MessageMapping("/room/{room-id}/character/mission")
public class GameMissionController {

    private final GameCharacterService gameCharacterService;
    private final SimpMessagingTemplate template;


    @MessageMapping("/complete")
    public void missionComplete(
            @DestinationVariable("room-id") String roomId, StompHeaderAccessor accessor,
            @Payload MissionRequest missionRequest) {
        log.info("/room/{}/mission/complete: {}", roomId, missionRequest);
        UUID uuidRoomId = UUID.fromString(roomId);
        String playerId = WebSocketUtil.getPlayerIdFromHeader(accessor);

        MissionProgressResponse response = gameCharacterService.missionComplete(uuidRoomId,
                playerId, missionRequest.getId());
        template.convertAndSend("/sub/room/" + roomId,
                BaseResponse.character(CharacterOperation.MISSION_PROGRESS).data(response));
        log.info("/sub/room/{}: {}", roomId, response);

        MissionCompleteResponse completeResponse = MissionCompleteResponse.of(
                missionRequest.getId(), true);
        log.info("/user/{}/queue: {}", accessor.getSessionId(), completeResponse);
        String sessionId = Objects.requireNonNull(accessor.getSessionId());
        template.convertAndSendToUser(sessionId, "/queue",
                BaseResponse.character(CharacterOperation.MISSION_COMPLETE).data(completeResponse),
                WebSocketUtil.createHeaders(sessionId));
    }

}
