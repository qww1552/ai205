package com.project.arc205.game.room;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.model.exception.RoomNotFoundException;
import com.project.arc205.game.room.repository.RoomRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class RoomRepositoryTests {

    private final RoomRepository roomRepository = new RoomRepository();

    @Test
    @DisplayName("룸 생성 시 gameRoomRepository 의 hashmap에 게임 룸이 저장된다.")
    void createTest() {
        Player master = new Player();
        Room room = roomRepository.create("test", master);
        assertThat(roomRepository.findById(room.getId()), is(equalTo(room)));
    }

    @Test
    @DisplayName("룸 전체 조회")
    void findAllTest() {
        Player master = new Player();
        roomRepository.create("test1", master);
        roomRepository.create("test2", master);
        roomRepository.create("test3", master);
        assertThat(roomRepository.findAll().size(), is(equalTo(3)));
    }

    @Test
    @DisplayName("룸 개별 조회")
    void findByIdTest() {
        Player master = new Player();
        Room room = roomRepository.create("test", master);
        assertThat(roomRepository.findById(room.getId()), is(equalTo(room)));
    }

    @Test
    @DisplayName("룸 개별 조회 실패 시 RoomNotFoundException 발생")
    void findByIdFailTest() {
        assertThrows(RoomNotFoundException.class,
                () -> roomRepository.findById(UUID.randomUUID()));
    }
}
