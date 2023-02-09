package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import com.project.arc205.common.model.Role;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameEndEvent implements DomainEvent {

    private UUID roomId;
    private Role winRole;
}
