package com.project.arc205.game.gamedata.event;


import com.project.arc205.common.event.DomainEvent;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class MissionProgressChangeEvent implements DomainEvent {

    private final UUID roomId;
    private final int progress;
}
