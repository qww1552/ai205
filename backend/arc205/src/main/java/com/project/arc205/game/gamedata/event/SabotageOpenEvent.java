package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public class SabotageOpenEvent implements DomainEvent {

    private UUID roomId;
    
}
