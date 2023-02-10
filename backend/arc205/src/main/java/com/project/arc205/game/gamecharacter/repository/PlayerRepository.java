package com.project.arc205.game.gamecharacter.repository;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class PlayerRepository {

    private final ConcurrentHashMap<String, Player> storage = new ConcurrentHashMap<>();

    public Player findBySessionId(String sessionId) {
        if (!StringUtils.hasText(sessionId)) {
            throw new IllegalArgumentException();
        }
        return storage.get(sessionId);
    }

    public void create(Player player) {
        storage.put(player.getSessionId(), player);
    }

}
