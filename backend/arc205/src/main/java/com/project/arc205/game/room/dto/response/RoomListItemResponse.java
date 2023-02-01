package com.project.arc205.game.room.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomListItemResponse {

    private String id;
    private String title;
    private Integer amountOfPlayers;

    @Builder
    public RoomListItemResponse(String id, String title, Integer amountOfPlayers) {
        this.id = id;
        this.title = title;
        this.amountOfPlayers = amountOfPlayers;
    }
}
