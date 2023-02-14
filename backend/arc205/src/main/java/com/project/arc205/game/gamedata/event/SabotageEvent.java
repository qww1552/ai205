package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SabotageEvent implements DomainEvent {

    private String playerId;

}
