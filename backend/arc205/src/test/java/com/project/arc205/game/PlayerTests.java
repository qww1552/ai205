package com.project.arc205.game;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

import com.project.arc205.game.dummy.DummyRoom;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class PlayerTests {

    @Test
    @DisplayName("Player가 exit을 호출하면 Room과의 관계가 사라진다")
    void exitTest() {
        Player player = Player.create("testId", "testSessionID");
        Room testRoom = DummyRoom.createEmptyTestRoom("testRoom");
        player.setRoom(testRoom);
        player.exit();

        assertThat(player.getRoom(), equalTo(null));
        assertThat(testRoom.getPlayers().get(player.getSessionId()), equalTo(null));
    }
}
