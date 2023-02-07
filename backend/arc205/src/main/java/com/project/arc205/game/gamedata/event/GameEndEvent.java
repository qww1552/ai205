package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class GameEndEvent {
    private UUID roomId;
    private Role winRole;
}
