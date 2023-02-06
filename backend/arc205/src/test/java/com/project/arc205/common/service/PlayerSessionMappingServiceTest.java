package com.project.arc205.common.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.project.arc205.game.dummy.DummyRoom;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class PlayerSessionMappingServiceTest {

    @Mock
    RoomRepository roomRepository;
    PlayerSessionMappingService mappingService;

    @BeforeEach
    void init() {
        this.mappingService = new PlayerSessionMappingService(roomRepository);
    }

    @Test
    @DisplayName("playerId는 PlayerSessionMappingService를 통해 sessionId로 변환된다.")
    void convertPlayerIdToSessionIdInRoom() {
        Player player = Player.create("player", "playerSessionId");
        Room testRoom = DummyRoom.createEmptyTestRoom("testRoom");
        testRoom.enter(player);

        when(roomRepository.findById(any()))
                .thenReturn(testRoom);

        assertThat(
                mappingService.convertPlayerIdToSessionIdInRoom(UUID.randomUUID(), player.getId()),
                equalTo(player.getSessionId()));
    }
}