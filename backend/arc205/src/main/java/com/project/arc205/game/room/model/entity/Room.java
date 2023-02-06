package com.project.arc205.game.room.model.entity;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(of = "id")
@ToString(of = {"id", "title", "master"})
public class Room {

    private UUID id;
    private String title;
    private Player master;
    private Map<String, Player> players;
    private GameSetting gameSetting;

    public static Room create(String title, Player master) {
        Room room = new Room();
        room.id = UUID.randomUUID();
        room.title = title;
//        room.master = master;
        Map<String, Player> players = new HashMap<>();
//        players.put(master.getSessionId(), master);
        room.players = players;
//        master.setRoom(room);
        room.gameSetting = new GameSetting();
        return room;
    }

    public boolean enter(Player player) {
        if (this.players.containsValue(player)) {
            return false;
        }
        this.players.put(player.getSessionId(), player);
        player.setRoom(this); // 양방향 매핑이므로 player에도 room을 추가함
        return true;
    }

}
