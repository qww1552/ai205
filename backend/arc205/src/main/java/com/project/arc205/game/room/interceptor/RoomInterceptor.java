package com.project.arc205.game.room.interceptor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

/**
 * Subscribe 요청을 가로채서 해당 Room에 입장시켜주는 인터셉터 url의 마지막 부분이 UUID 형태의 문자열인 room-id 이어야 함
 */

@Slf4j
@RequiredArgsConstructor
@Component
public class RoomInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(message);
        log.info("accessor presend : {}", accessor);
//        Player player = playerRepository.findBySessionId(accessor.getSessionId());
//        accessor.setUser(player);
//        accessor.setLeaveMutable(true);

        return message;
    }


}

