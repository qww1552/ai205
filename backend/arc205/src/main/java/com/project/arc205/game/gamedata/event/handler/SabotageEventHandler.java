package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.service.PlayerRoomMappingRepository;
import com.project.arc205.common.service.PlayerSessionMappingService;
import com.project.arc205.common.util.Constant;
import com.project.arc205.common.util.WebSocketUtil;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamedata.event.SabotageCloseEvent;
import com.project.arc205.game.gamedata.event.SabotageOpenEvent;
import com.project.arc205.game.gamedata.event.SabotageRequestEvent;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.Sabotage;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@AllArgsConstructor
public class SabotageEventHandler {

    private final GameRepository gameRepository;
    private final PlayerSessionMappingService mappingService;
    private final PlayerRoomMappingRepository playerRoomMappingRepository;
    private final SimpMessagingTemplate template;
    private final TaskScheduler taskScheduler;

    @Transactional
    @Async
    @EventListener
    public void onSabotageRequest(SabotageRequestEvent event) {
        log.info("on sabotage request : {}", event);
        UUID roomId = playerRoomMappingRepository.findRoomIdByPlayerId(event.getPlayerId());
        GameData gameData = gameRepository.findById(roomId);
        Sabotage sabotage = gameData.getSabotage();
        sabotage.open();
    }

    @Async
    @EventListener
    public void onSabotageOpen(SabotageOpenEvent event) {
        log.info("on sabotage open : {}", event);
        UUID roomId = event.getRoomId();

        GameData gameData = gameRepository.findById(roomId);

        sendSabotageOpenMessage(roomId, gameData.getGameCharacters());

    }

    @Async
    @EventListener
    public void onSabotageClose(SabotageCloseEvent event) {
        log.info("on sabotage close : {}", event);

        UUID roomId = event.getRoomId();
        String destination = Constant.DESTINATION_PREFIX + roomId;

        GameData gameData = gameRepository.findById(roomId);

        sendBroadCastMessage(destination, CharacterOperation.SABOTAGE_CLOSE);

        Sabotage sabotage = gameData.getSabotage();
        taskScheduler.schedule(() -> sabotage.setCoolTime(false),
                new Date(System.currentTimeMillis() + sabotage.getCoolTime()));
    }

    private void sendSabotageOpenMessage(UUID roomId, Map<String, GameCharacter> gameCharacters) {
        String destination = Constant.DESTINATION_PREFIX + roomId;

        sendBroadCastMessage(destination, CharacterOperation.SABOTAGE_OPEN);

        for (GameCharacter gameCharacter : gameCharacters.values()) {
            if (gameCharacter instanceof Mafia || !gameCharacter.getIsAlive()) {
                continue;
            }
            String sessionIdInRoom = mappingService.convertPlayerIdToSessionIdInRoom(roomId,
                    gameCharacter.getPlayerId());

            sendSightOffMessage(sessionIdInRoom);
        }
    }

    private void sendBroadCastMessage(String destination, CharacterOperation operation) {
        template.convertAndSend(destination, BaseResponse.character(operation).build());
    }

    private void sendSightOffMessage(String sessionIdInRoom) {
        sendSabotageMessage(sessionIdInRoom, CharacterOperation.SIGHT_OFF);
    }

    private void sendSabotageMessage(String sessionIdInRoom, CharacterOperation operation) {
        template.convertAndSendToUser(sessionIdInRoom, "/queue",
                BaseResponse.character(operation).build(),
                WebSocketUtil.createHeaders(sessionIdInRoom));
    }

}
