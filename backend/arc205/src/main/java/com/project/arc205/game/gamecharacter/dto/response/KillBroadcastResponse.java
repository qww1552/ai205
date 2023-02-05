package com.project.arc205.game.gamecharacter.dto.response;

import com.project.arc205.common.model.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KillBroadcastResponse {

    private final Player player;
    private final Location location;

    public KillBroadcastResponse(Player player, Location location) {
        this.player = player;
        this.location = location;
    }

    @AllArgsConstructor(staticName = "of")
    public static class Player {

        String id;
        String role;
        Boolean isAlive;

    }
}
