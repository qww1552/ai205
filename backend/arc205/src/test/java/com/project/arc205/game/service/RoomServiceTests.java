package com.project.arc205.game.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

import com.project.arc205.game.dummy.DummyRoom;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import com.project.arc205.game.room.service.RoomService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class RoomServiceTests {

    @Mock
    RoomRepository roomRepository;

    RoomService roomService;

    @BeforeEach
    void init() {
        roomService = new RoomService(roomRepository);
    }

    @Test
    @DisplayName("전체 조회 시 이미 게임이 진행중인 방은 조회하지 않는다.")
    void findAllExceptPlaying() {
        Room testRoom1 = DummyRoom.createEmptyTestRoom("Test Room1");
        Room testRoom2 = DummyRoom.createEmptyTestRoom("Test Room2");
        when(roomRepository.findAll())
                .thenReturn(new ArrayList<>(List.of(testRoom1, testRoom2)));

        testRoom1.setPlay();

        assertThat(roomService.findAll().size(), equalTo(1));
    }
}
