package com.project.arc205.game.gamecharacter.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.game.gamecharacter.dto.request.KillRequest;
import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.service.GameCharacterService;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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

    @MessageMapping("/room/{room-id}/character/move")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<MoveResponse> move(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor, MoveRequest moveRequest) {
        UUID roomUuid = UUID.fromString(roomId);

        String playerId = getPlayerIdFromHeader(accessor, roomUuid);

        MoveResponse moveResponse = gameCharacterService.move(roomUuid,
                playerId, moveRequest.getLocation());

        return BaseResponse.character(CharacterOperation.MOVE).data(moveResponse);
    }

    @MessageMapping("/room/{room-id}/character/kill")
    public void kill(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor, @Valid KillRequest killRequest) {
        log.info("전달 받은 kill : {}", killRequest);

        UUID roomUuid = UUID.fromString(roomId);

        String mafiaPlayerId = getPlayerIdFromHeader(accessor, roomUuid);
        String citizenPlayerId = killRequest.getTo();

        gameCharacterService.kill(
                roomUuid,
                mafiaPlayerId,
                citizenPlayerId);
    }

    private String getPlayerIdFromHeader(StompHeaderAccessor accessor, UUID roomUuid) {
        return mappingService.convertSessionIdToPlayerIdInRoom(roomUuid,
                accessor.getSessionId());
    }

}
