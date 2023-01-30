package com.project.arc205.game.room;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class RoomTests {

    @Test
    @DisplayName("룸 생성 시 방 작성자가 players에 포함된다.")
    void masterIncludedInRoomWhenCreateRoomTest() {
        Player master = new Player();
//        master.setName("master");
        Room room = Room.create("test", master);

        assertThat(room.getPlayers().contains(master), is(true));
    }

    @Test
    @DisplayName("룸 생성 시 방 작성자에 룸이 세팅된다.")
    void roomSetToMasterWhenCreateRoomTest() {
        Player master = new Player();
//        master.setName("master");
        Room room = Room.create("test", master);

        assertThat(master.getRoom(), is(equalTo(room)));
    }
}
