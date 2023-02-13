package com.project.arc205.game.room.service;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.room.repository.RoomRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class RoomDeleteService {

    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;

    public void delete(UUID roomId) {
        gameRepository.deleteById(roomId);

        List<Player> exitList = new ArrayList<>(
                roomRepository.findById(roomId).getPlayers().values());
        // player.exit 메소드가 room의 players를 변경하므로 따로 저장해두고 삭제(ConcurrentModificationException 을 회피하기 위함)

        for (Player player : exitList) {
            player.exit(); // player와 room의 관계를 끊어서 GC를 노림
        }
        roomRepository.deleteById(roomId);
    }
}
