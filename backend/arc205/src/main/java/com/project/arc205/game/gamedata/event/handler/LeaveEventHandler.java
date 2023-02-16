package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.util.Constant;
import com.project.arc205.game.gamecharacter.dto.response.MoveResponse;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.event.LeaveEvent;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@AllArgsConstructor
public class LeaveEventHandler {

    private final GameRepository gameRepository;
    private final SimpMessagingTemplate template;

    @EventListener
    @Transactional
    public void leaveGame(LeaveEvent event) {
        log.info("LeaveEvent(leaveGame): {}", event);
        GameData gameData = gameRepository.findById(event.getRoomId());

        //set leave character
        GameCharacter gameCharacter = gameData.getGameCharacter(event.getPlayerId());
        setLeaveCharacter(event.getRoomId(), gameCharacter);

        //remove from game
        gameData.getGameCharacters().remove(event.getPlayerId());

        //refresh game data
        gameData.refreshMissionCount();
        gameData.checkGameEnd();
    }

    private void setLeaveCharacter(UUID roomId, GameCharacter gameCharacter) {
        gameCharacter.setLocation(new Location(99.9, 99.9));
        sendMoveMessage(roomId, gameCharacter);
        gameCharacter.die();
    }

    private void sendMoveMessage(UUID roomId, GameCharacter gameCharacter) {
        MoveResponse moveResponse = MoveResponse.builder()
                .playerId(gameCharacter.getPlayerId())
                .role(gameCharacter.getRole())
                .isAlive(gameCharacter.getIsAlive())
                .location(gameCharacter.getLocation())
                .build();
        BaseResponse<MoveResponse> response = BaseResponse.character(CharacterOperation.MOVE)
                .data(moveResponse);

        template.convertAndSend(Constant.DESTINATION_PREFIX + roomId.toString(), response);
    }
}
