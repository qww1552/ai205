package com.project.arc205.game.room.service;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.dto.response.RoomListItemResponse;
import com.project.arc205.game.room.dto.response.RoomResponse;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public void enterRoom(String roomId, String sessionId) {
        UUID uuidRoomId = UUID.fromString(roomId);
        Player player = Player.create(sessionId); // 방 최초 입장 시 (subscribe) 플레이어 생성

        Room room = roomRepository.findById(uuidRoomId);
        room.enter(player);
        log.info("player {} entered room {}", player, roomId);

    }

    public RoomResponse findRoomById(String id) {
        UUID uuidRoomId = UUID.fromString(id);
        Room room = roomRepository.findById(uuidRoomId);

        List<RoomResponse.Player> playerResponseList = room.getPlayers().stream().map(
                player -> RoomResponse.Player.of(player.getId())
        ).collect(Collectors.toList());

        return RoomResponse.builder()
                .id(room.getId().toString())
                .title(room.getTitle())
                .players(playerResponseList)
                .build();
    }

    public List<RoomListItemResponse> findAll() {
        return roomRepository.findAll()
                .stream()
                .map((room) ->
                        RoomListItemResponse.builder()
                                .id(room.getId().toString())
                                .title(room.getTitle())
                                .amountOfPlayers(room.getPlayers().size())
                                .build())
                .collect(Collectors.toList());
    }
}
