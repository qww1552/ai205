package com.project.arc205.game.room.service;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.dto.response.RoomListItemResponse;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public void enterRoom(UUID roomId, Player player) {
        Room room = roomRepository.findById(roomId);
        room.enter(player);
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
