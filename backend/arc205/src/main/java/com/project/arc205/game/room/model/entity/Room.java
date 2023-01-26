package com.project.arc205.game.room.model.entity;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(of = "id")
public class Room {

    private UUID id;
    private String title;
    private Player master;
    private List<Player> players;

    public static Room create(String title, Player master) {
        Room room = new Room();
        room.id = UUID.randomUUID();
        room.title = title;
        room.master = master;
        List<Player> playerList = new ArrayList<>();
        playerList.add(master);
        room.players = playerList;
        master.setRoom(room);
        return room;
    }


}
