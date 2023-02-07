package com.project.arc205.common.service;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class PlayerSessionMappingService {

    private final RoomRepository roomRepository;

    public String convertSessionIdToPlayerIdInRoom(UUID roomId, String sessionId) {
        Room room = roomRepository.findById(roomId);
        for (Player player : room.getPlayers().values()) {
            if (player.getSessionId().equals(sessionId)) {
                return player.getId();
            }
        }
        throw new NoMatchingSessionException();
    }

    public String convertPlayerIdToSessionIdInRoom(UUID roomId, String playerId) {
        Room room = roomRepository.findById(roomId);
        for (Player player : room.getPlayers().values()) {
            if (player.getId().equals(playerId)) {
                return player.getSessionId();
            }
        }
        throw new NoMatchingSessionException();
    }

}
