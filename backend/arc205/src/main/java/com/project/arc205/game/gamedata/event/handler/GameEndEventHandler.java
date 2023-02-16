package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.common.util.Constant;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.dto.response.GameEndResponse;
import com.project.arc205.game.gamedata.event.GameEndEvent;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.room.service.RoomDeleteService;
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
public class GameEndEventHandler {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final GameRepository gameRepository;
    private final RoomDeleteService roomDeleteService;

    @Async
    @EventListener
    public void gameEnd(GameEndEvent event) {
        UUID roomId = event.getRoomId();
        String destination = Constant.DESTINATION_PREFIX + roomId;
        log.info("{}: game end event", destination);
        Map<String, GameCharacter> characters = gameRepository.findById(roomId)
                .getGameCharacters();

        GameEndResponse gameEndResponse = GameEndResponse.of(event.getWinRole(), characters);

        BaseResponse<GameEndResponse> response = BaseResponse.game(GameOperation.END)
                .data(gameEndResponse);

        simpMessagingTemplate.convertAndSend(destination, response);

        roomDeleteService.delete(roomId);
    }
}
