package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class DieEvent extends CheckGameEndEvent implements DomainEvent {

    public DieEvent(String playerId) {
        super(playerId);
    }
}
