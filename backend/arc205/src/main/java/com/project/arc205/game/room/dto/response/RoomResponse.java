package com.project.arc205.game.room.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
public class RoomResponse {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Player {
        private String id;

        public static Player of(String id) {
            return new Player(id);
        }
    }

    @JsonProperty("roomId")
    private String id;
    private String title;
    @JsonProperty("players")
    private List<Player> players;
    private Integer amountOfPlayers;

    @Builder
    public RoomResponse(String id, String title, List<Player> players) {
        this.id = id;
        this.title = title;
        this.players = players;
        this.amountOfPlayers = players.size();
    }
}
