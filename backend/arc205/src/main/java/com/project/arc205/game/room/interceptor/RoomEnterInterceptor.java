package com.project.arc205.game.room.interceptor;

import com.project.arc205.game.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Subscribe 요청을 가로채서 해당 Room에 입장시켜주는 인터셉터
 * url의 마지막 부분이 UUID 형태의 문자열인 room-id 이어야 함
 */

@Slf4j
@RequiredArgsConstructor
@Component
public class RoomEnterInterceptor implements ChannelInterceptor {


    private final RoomService roomService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (!StompCommand.SUBSCRIBE.equals(accessor.getCommand())) return message;
        String roomId = getRoomIdFromHeader(accessor);

        roomService.enterRoom(roomId, accessor.getSessionId());

        return ChannelInterceptor.super.preSend(message, channel);
    }

    private static String getRoomIdFromHeader(StompHeaderAccessor accessor) {
        String destination = accessor.getDestination();
        return Objects.requireNonNull(destination).substring(destination.lastIndexOf("/") + 1);
    }
}
