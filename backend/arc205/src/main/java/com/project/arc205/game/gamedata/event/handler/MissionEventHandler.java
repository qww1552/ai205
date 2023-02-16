package com.project.arc205.game.gamedata.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.util.Constant;
import com.project.arc205.game.gamecharacter.dto.response.MissionProgressResponse;
import com.project.arc205.game.gamedata.event.MissionProgressChangeEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class MissionEventHandler {

    private final SimpMessagingTemplate template;

    @EventListener
    public void sendMissionProgress(MissionProgressChangeEvent event) {
        log.info("MissionEvent(sendMissionProgress): {}", event);
        MissionProgressResponse response = MissionProgressResponse.of(event.getProgress());
        String destination = Constant.DESTINATION_PREFIX + event.getRoomId();

        template.convertAndSend(destination,
                BaseResponse.character(CharacterOperation.MISSION_PROGRESS).data(response));
        log.info("{}: {}", destination, response);
    }
}
