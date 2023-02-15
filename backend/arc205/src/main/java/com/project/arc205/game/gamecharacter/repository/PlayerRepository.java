package com.project.arc205.game.gamecharacter.repository;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class PlayerRepository {

    private final ConcurrentHashMap<String, Player> sessionStorage = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Player> idStorage = new ConcurrentHashMap<>();

    public Player findBySessionId(String sessionId) {
        if (!StringUtils.hasText(sessionId)) {
            throw new IllegalArgumentException();
        }
        return sessionStorage.get(sessionId);
    }

    public Player findByPlayerId(String playerId) {
        return idStorage.get(playerId);
    }

    public void create(Player player) {
        sessionStorage.put(player.getSessionId(), player);
        idStorage.put(player.getId(), player);
    }

    public void deleteBySessionId(String sessionId) {
        Player bySessionId = findBySessionId(sessionId);
        sessionStorage.remove(sessionId);
        idStorage.remove(bySessionId.getId());
    }

}
