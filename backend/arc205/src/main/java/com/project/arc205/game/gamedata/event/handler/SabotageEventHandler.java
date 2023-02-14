package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerRoomMappingRepository;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.event.SabotageEvent;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.Map;
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
public class SabotageEventHandler {

    private final GameRepository gameRepository;
    private final PlayerSessionMappingService mappingService;
    private final PlayerRoomMappingRepository playerRoomMappingRepository;
    private final SimpMessagingTemplate template;

    @Async
    @EventListener
    public void sendSabotage(SabotageEvent event) {
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        log.info("Sabotage : {}, {}", roomId.toString(), event.getPlayerId());

        Map<String, GameCharacter> gameCharacters = gameRepository.findById(roomId)
                .getGameCharacters();

        for (GameCharacter gameCharacter : gameCharacters.values()) {
            if (gameCharacter instanceof Mafia) {
                continue;
            }

            String sessionIdInRoom = mappingService.convertPlayerIdToSessionIdInRoom(roomId,
                    gameCharacter.getPlayerId());

            template.convertAndSendToUser(sessionIdInRoom, "/queue",
                    BaseResponse.character(CharacterOperation.SABOTAGE).build(),
                    WebSocketUtil.createHeaders(sessionIdInRoom));
        }
    }
}
