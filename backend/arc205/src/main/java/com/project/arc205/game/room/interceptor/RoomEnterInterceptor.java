package com.project.arc205.game.room.interceptor;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamecharacter.repository.PlayerRepository;
import com.project.arc205.game.room.service.RoomService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

/**
 * Subscribe 요청을 가로채서 해당 Room에 입장시켜주는 인터셉터 url의 마지막 부분이 UUID 형태의 문자열인 room-id 이어야 함
 */

@Slf4j
@RequiredArgsConstructor
@Component
public class RoomEnterInterceptor implements ChannelInterceptor {

    private final RoomService roomService;
    private final PlayerRepository playerRepository;
    private final String ROOM_SUBSCRIPTION_PREFIX = "/sub";

    @EventListener
    public void onConnect(SessionConnectEvent event) {
        log.info("event occur : {}", event);
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String playerId = accessor.getFirstNativeHeader("playerId");
        String sessionId = accessor.getSessionId();
        Player player = Player.create(playerId, sessionId);
        playerRepository.create(player);
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("accessor presend : {}", accessor);
        if (isRoomSubscriptionMessage(accessor)) {
            log.info("accessor in interceptor :: {}", accessor);

            String roomId = getRoomIdFromHeader(accessor);

            String sessionId = accessor.getSessionId();

            Player player = playerRepository.findBySessionId(sessionId);

            roomService.enterRoom(roomId, player);
        }

        return message;
    }

    private boolean isRoomSubscriptionMessage(StompHeaderAccessor accessor) {
        return isSubscriptionCommand(accessor) &&
                isSubscriptionDestination(accessor);
    }

    private boolean isSubscriptionDestination(StompHeaderAccessor accessor) {
        return accessor.getDestination().startsWith(ROOM_SUBSCRIPTION_PREFIX);
    }

    private boolean isSubscriptionCommand(StompHeaderAccessor accessor) {
        return StompCommand.SUBSCRIBE.equals(accessor.getCommand());
    }

    private String getRoomIdFromHeader(StompHeaderAccessor accessor) {
        String destination = accessor.getDestination();
        return Objects.requireNonNull(destination).substring(destination.lastIndexOf("/") + 1);
    }
}

