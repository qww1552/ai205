package com.project.arc205.game.mission.event.handler;

import com.project.arc205.game.mission.event.MissionEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class MissionEventHandler {

    @Async
    @EventListener
    public void sendMissionComplete(MissionEvent event) {

    }

    @Async
    @EventListener
    public void sendMissionProgress(MissionEvent event) {
    }

}
