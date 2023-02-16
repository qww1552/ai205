package com.project.arc205.websocket.interceptor;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamecharacter.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class RoomInterceptor implements ChannelInterceptor {

    private final PlayerRepository playerRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.wrap(message);
        Player player = playerRepository.findBySessionId(accessor.getSessionId());
        accessor.setUser(player);
        accessor.setLeaveMutable(true);
//        log.info("accessor presend : {}", accessor);
        return MessageBuilder.fromMessage(message).setHeaders(accessor).build();
    }


}

