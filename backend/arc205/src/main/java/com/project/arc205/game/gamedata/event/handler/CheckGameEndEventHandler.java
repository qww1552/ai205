package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.game.gamecharacter.repository.PlayerRepository;
import com.project.arc205.game.gamedata.event.CheckGameEndEvent;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@AllArgsConstructor
public class CheckGameEndEventHandler {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    @Async
    @EventListener
    @Transactional
    public void checkGameEnd(CheckGameEndEvent event) {
        UUID roomId = playerRepository.findByPlayerId(event.getPlayerId()).getRoom().getId();
        gameRepository.findById(roomId).checkGameEnd();
        log.info("CheckGameEndEvent(checkGameEnd): {}, {}", roomId.toString(), event.getPlayerId());
    }

}
