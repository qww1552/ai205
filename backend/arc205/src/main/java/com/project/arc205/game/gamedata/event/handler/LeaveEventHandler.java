package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.game.gamedata.event.LeaveEvent;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class LeaveEventHandler {

    GameRepository gameRepository;

    @EventListener
    public void leaveGame(LeaveEvent event) {
        log.info("LeaveEvent(leaveGame): {}", event);
        GameData gameData = gameRepository.findById(event.getRoomId());
        gameData.getGameCharacters().remove(event.getPlayerId());
        gameData.checkGameEnd();
    }

}
