package com.project.arc205.game.player.repository;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamecharacter.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class PlayerRepositoryTests {

    PlayerRepository playerRepository;

    @BeforeEach
    void init() {
        playerRepository = new PlayerRepository();
    }

    @Test
    @DisplayName("저장된 player를 id로 조회할 수 있다.")
    void idMappedWhenCreate() {
        Player player = Player.create("testId", "testSessionID");
        playerRepository.create(player);

        assertThat(playerRepository.findByPlayerId(player.getId()), equalTo(player));
    }

    @Test
    @DisplayName("저장된 player를 sessionId로 조회할 수 있다.")
    void sessionIdMappedWhenCreate() {
        Player player = Player.create("testId", "testSessionID");
        playerRepository.create(player);

        assertThat(playerRepository.findBySessionId(player.getSessionId()), equalTo(player));
    }
}
