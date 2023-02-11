package com.project.arc205.common.service;

import com.project.arc205.game.room.model.exception.PlayerIdAlreadyExistException;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class PlayerRoomMappingRepository {

    private final ConcurrentHashMap<String, UUID> playerRoomIdMap = new ConcurrentHashMap<>();

    public UUID findRoomIdByPlayerId(String playerId) {
        if (!playerRoomIdMap.containsKey(playerId)) {
            //TODO: throw no content exception
            throw new RuntimeException("존재하지 않은 플레이어");
        }
        return playerRoomIdMap.get(playerId);
    }

    public void create(String playerId, UUID roomId) {
        if (playerRoomIdMap.containsKey(playerId)) {
            throw new PlayerIdAlreadyExistException(playerId);
        }
        log.info("mapping: {} - {}", playerId, roomId.toString());
        playerRoomIdMap.put(playerId, roomId);
    }

    public void delete(String playerId) {
        //Room은 무조건 갖고 있는 players에 대해 delete(player) 한 다음에 지워져야함
        if (!playerRoomIdMap.containsKey(playerId)) {
            //TODO: throw no content exception
            throw new RuntimeException("존재하지 않은 플레이어");
        }
        playerRoomIdMap.remove(playerId);
    }

}
