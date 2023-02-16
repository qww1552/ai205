package com.project.arc205.websocket.handler;

import static com.project.arc205.common.util.WebSocketUtil.isRoomSubscriptionMessage;

import com.project.arc205.common.event.Events;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamecharacter.repository.PlayerRepository;
import com.project.arc205.game.gamedata.event.LeaveEvent;
import com.project.arc205.game.room.service.RoomService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Slf4j
@RequiredArgsConstructor
@Component
public class SessionEventHandler {

    private final RoomService roomService;
    private final PlayerRepository playerRepository;

    public String getRoomIdFromHeader(SimpMessageHeaderAccessor accessor) {
        String destination = accessor.getDestination();
        return Objects.requireNonNull(destination).substring(destination.lastIndexOf("/") + 1);
    }

    @EventListener
    public void onConnect(SessionConnectEvent event) {
        log.info("event occur : {}", event);
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String playerId = accessor.getFirstNativeHeader("playerId");
        String sessionId = accessor.getSessionId();
        Player player = Player.create(playerId, sessionId);
        playerRepository.create(player);
    }

    @EventListener
    public void onSubscribe(SessionSubscribeEvent event) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        if (isRoomSubscriptionMessage(accessor)) {
            log.info("onSub : {}", accessor);

            String roomId = getRoomIdFromHeader(accessor);

            String sessionId = accessor.getSessionId();

            Player player = playerRepository.findBySessionId(sessionId);

            roomService.enterRoom(roomId, player);
        }
    }

    @EventListener
    @Transactional
    public void onDisconnect(SessionDisconnectEvent event) {
        log.info("onDisconnect : {}", event);
        Player player = playerRepository.findBySessionId(event.getSessionId());
//        Player player = (Player) event.getUser();
        if (player.getRoom() != null) {
            Events.raise(new LeaveEvent(player.getId(), player.getRoom().getId()));
        }
        player.exit();
        playerRepository.deleteBySessionId(event.getSessionId());
    }

}
