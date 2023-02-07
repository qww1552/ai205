package com.project.arc205.game.gamecharacter.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MoveResponse {

    @JsonProperty("player")
    Player player;
    Location location;

    @Builder
    public MoveResponse(String playerId, Role role, boolean isAlive, Location location) {
        this.player = Player.of(playerId, role, isAlive);
        this.location = location;
    }

    @Getter
    @Setter
    @AllArgsConstructor(staticName = "of")
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    static class Player {

        String id;
        Role role;
        Boolean isAlive;

//        static Player of(String id, Role role, boolean isAlive) {
//            Player newPlayer = new Player();
//            newPlayer.id = id;
//            newPlayer.role = role;
//            newPlayer.isAlive = isAlive;
//            return newPlayer;
//        }
    }
}

