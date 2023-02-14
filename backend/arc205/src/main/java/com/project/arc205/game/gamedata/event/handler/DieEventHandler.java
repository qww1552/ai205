package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerRoomMappingRepository;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.common.util.Constant;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.dto.response.KillBroadcastResponse;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.event.DieEvent;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class DieEventHandler {

    private final GameRepository gameRepository;
    private final PlayerRoomMappingRepository playerRoomMappingRepository;
    private final PlayerSessionMappingService playerSessionMappingService;
    private final SimpMessagingTemplate template;

    @Async
    @EventListener
    public void sendDie(DieEvent event) {
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        log.info("DieEvent(sendDie): {}, {}", roomId.toString(), event.getPlayerId());
        GameCharacter deadCharacter = gameRepository.findById(roomId)
                .getGameCharacter(event.getPlayerId());

        String destination = Constant.DESTINATION_PREFIX + roomId;
        KillBroadcastResponse responseData = KillBroadcastResponse.of(deadCharacter);
        BaseResponse<KillBroadcastResponse> response = BaseResponse.character(
                CharacterOperation.DIE).data(responseData);
        template.convertAndSend(destination, response);
        log.info("{}: {}", destination, responseData);
    }

    @Async
    @EventListener
    public void sendYouDie(DieEvent event) {
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        String sessionId = playerSessionMappingService.convertPlayerIdToSessionIdInRoom(
                roomId,
                event.getPlayerId());
        log.info("DieEvent(sendYouDie): {}, {}, {}", roomId.toString(), event.getPlayerId(),
                sessionId);
        template.convertAndSendToUser(sessionId, "/queue",
                BaseResponse.character(CharacterOperation.YOU_DIED).build(),
                WebSocketUtil.createHeaders(sessionId));
        log.info("/user/{}/queue: /CHARACTER/YOU_DIED", sessionId);
    }

}
