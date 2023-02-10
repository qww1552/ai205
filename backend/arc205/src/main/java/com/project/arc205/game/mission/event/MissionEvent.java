package com.project.arc205.game.mission.event;

import com.project.arc205.common.event.DomainEvent;
import com.project.arc205.game.mission.model.ActiveMission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class MissionEvent implements DomainEvent {

    private String playerId;
    private ActiveMission mission;
}
