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
        Player master = Player.create("master");
        Room room = Room.create("test", master);

        assertThat(room.getPlayers().contains(master), is(true));
    }

    @Test
    @DisplayName("룸 생성 시 방 작성자에 룸이 세팅된다.")
    void roomSetToMasterWhenCreateRoomTest() {
        Player master = Player.create("master");
        Room room = Room.create("test", master);

        assertThat(master.getRoom(), is(equalTo(room)));
    }

    @Test
    @DisplayName("룸에 참가하면 관계가 양방향으로 저장된다.")
    void playerJoinRoomTest() {
        Player master = Player.create("master");
        Room room = Room.create("test", master);
        Player player = Player.create("join");

        room.enter(player);

        assertThat(room.getPlayers().contains(player), is(true));
        assertThat(player.getRoom(), is(equalTo(room)));
    }

    @Test
    @DisplayName("룸에 이미 참여중인 사용자가 다시 참가하면 false를 반환한다.")
    void playerJoinRoomReturnFalseIfConflictTest() {
        Player master = Player.create("master");
        Room room = Room.create("test", master);
        Player player = Player.create("join");

        room.enter(player);

        assertThat(room.enter(player), is(false));
    }
}
