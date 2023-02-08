package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.service.PlayerRoomMappingRepository;
import com.project.arc205.game.gamedata.event.DieEvent;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
    public void sendYouDie(DieEvent event) {
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        String citizenSessionId = playerSessionMappingService.convertPlayerIdToSessionIdInRoom(
                roomId,
                event.getPlayerId());
        log.info("DieEvent - send YOU_DIE: {}, {}, {}", roomId.toString(), event.getPlayerId(),
                citizenSessionId);
        template.convertAndSendToUser(citizenSessionId, "/queue",
                BaseResponse.character(CharacterOperation.YOU_DIED).build(),
                WebSocketUtil.createHeaders(citizenSessionId)
        );
    }

    @Async
    @EventListener
    @Transactional
    public void checkGameEnd(DieEvent event) {
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        gameRepository.findById(roomId).checkGameEnd();
        log.info("DieEvent - check game end: {}, {}", roomId.toString(), event.getPlayerId());
    }

}
