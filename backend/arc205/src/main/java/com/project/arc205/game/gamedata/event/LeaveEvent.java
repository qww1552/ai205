package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class LeaveEvent implements DomainEvent {

    private final String playerId;
    private final UUID roomId;

}
