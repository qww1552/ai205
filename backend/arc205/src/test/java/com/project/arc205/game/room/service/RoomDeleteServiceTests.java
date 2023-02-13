package com.project.arc205.game.room.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.project.arc205.game.dummy.DummyGameData;
import com.project.arc205.game.dummy.DummyPlayer;
import com.project.arc205.game.dummy.DummyRoom;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class RoomDeleteServiceTests {

    @Mock
    RoomRepository roomRepository;
    @Mock
    GameRepository gameRepository;
    RoomDeleteService roomDeleteService;

    @BeforeEach
    void init() {
        roomDeleteService = new RoomDeleteService(roomRepository, gameRepository);
    }

    @Test
    @DisplayName("room 삭제 시 player와의 관계가 사라진다.")
    void deleteRoomTest() {
        Room testRoom = DummyRoom.createEmptyTestRoom("test");
        testRoom.enter(DummyPlayer.getTestPlayer("test1"));
        testRoom.enter(DummyPlayer.getTestPlayer("test2"));

        GameData emptyTestGameData = DummyGameData.getEmptyTestGameDataFromRoom(testRoom);

        when(roomRepository.findById(testRoom.getId()))
                .thenReturn(testRoom);
        when(gameRepository.findById(any()))
                .thenReturn(emptyTestGameData);

        roomDeleteService.delete(testRoom.getId());

        Map<String, Player> players = testRoom.getPlayers();
        for (Player player : players.values()) {
            assertThat(player.getRoom(), equalTo(null));
        }
    }
}
