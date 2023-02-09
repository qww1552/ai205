package com.project.arc205.game.gamecharacter.dto.response;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class KillBroadcastResponse {

    private final Player player;
    private final Location location;

    private KillBroadcastResponse(Player player, Location location) {
        this.player = player;
        this.location = location;
    }

    public static KillBroadcastResponse of(GameCharacter character) {
        return new KillBroadcastResponse(
                Player.of(character.getPlayerId(), character.getRole(), character.getIsAlive(),
                        character.getColor()), character.getLocation());
    }

    @Getter
    @ToString
    @AllArgsConstructor(staticName = "of")
    public static class Player {

        String id;
        Role role;
        Boolean isAlive;
        int color;

    }
}
