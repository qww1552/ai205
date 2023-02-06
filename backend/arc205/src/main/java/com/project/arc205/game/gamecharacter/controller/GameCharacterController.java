package com.project.arc205.game.gamecharacter.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.game.gamecharacter.dto.request.KillRequest;
import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.KillBroadcastResponse;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.service.GameCharacterService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

/**
 * GameCharacter의 동작을 전달받아 해당하는 메소드를 호출해주는 객체
 */
@Slf4j
@RequiredArgsConstructor
@Controller
public class GameCharacterController {

    private final GameCharacterService gameCharacterService;
    private final PlayerSessionMappingService mappingService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/room/{room-id}/character/move")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<MoveResponse> move(MoveRequest moveRequest) {
        return BaseResponse.of(Type.CHARACTER, CharacterOperation.MOVE,
                gameCharacterService.move(moveRequest));
    }

    @MessageMapping("/room/{room-id}/character/kill")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<KillBroadcastResponse> kill(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor, KillRequest killRequest) {
        log.info("전달 받은 kill : {}", killRequest);
        UUID roomUuid = UUID.fromString(roomId);
        String mafiaSessionId = accessor.getSessionId();

        String citizenSessionId = mappingService.convertPlayerIdToSessionIdInRoom(roomUuid,
                killRequest.getTo());

        KillBroadcastResponse killBroadcastResponse = gameCharacterService.kill(
                roomUuid,
                mafiaSessionId,
                citizenSessionId);

        template.convertAndSendToUser(citizenSessionId, "/user/queue",
                BaseResponse.of(Type.CHARACTER, CharacterOperation.YOU_DIED));

        return BaseResponse.of(Type.CHARACTER, CharacterOperation.DIE, killBroadcastResponse);
    }
}
