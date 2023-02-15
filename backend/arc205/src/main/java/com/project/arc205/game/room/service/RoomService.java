package com.project.arc205.game.room.service;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.dto.response.RoomCreateResponse;
import com.project.arc205.game.room.dto.response.RoomListItemResponse;
import com.project.arc205.game.room.dto.response.RoomResponse;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public void enterRoom(String roomId, Player player) {
        UUID uuidRoomId = UUID.fromString(roomId);

        Room room = roomRepository.findById(uuidRoomId);
        room.enter(player);

        log.info("player {} entered room {}", player, roomId);

    }

    public RoomResponse findRoomById(String id) {
        UUID uuidRoomId = UUID.fromString(id);
        Room room = roomRepository.findById(uuidRoomId);

        List<RoomResponse.Player> playerResponseList = room.getPlayers().values().stream().map(
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
                .filter((room) -> !room.isPlaying())
                .map((room) ->
                        RoomListItemResponse.builder()
                                .id(room.getId().toString())
                                .title(room.getTitle())
                                .amountOfPlayers(room.getPlayers().size())
                                .build())
                .collect(Collectors.toList());
    }

    public RoomCreateResponse create(String title) {
        Room room = roomRepository.create(title, null);
        return new RoomCreateResponse(room.getId().toString());
    }
}
