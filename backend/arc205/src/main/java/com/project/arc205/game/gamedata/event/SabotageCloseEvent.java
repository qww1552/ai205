package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
public class SabotageCloseEvent implements DomainEvent {

    private UUID roomId;
}
