package com.project.arc205.game.service;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.project.arc205.game.gamecharacter.exception.OnlyMafiaCanKillException;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.service.GameCharacterService;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import com.project.arc205.game.gamedata.repository.GameRepository;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class GameCharacterServiceTests {

    @Mock
    GameRepository gameRepository;

    GameCharacterService gameCharacterService;

    @BeforeEach
    void init() {
        this.gameCharacterService = new GameCharacterService(gameRepository);
    }

    @Test
    @DisplayName("마피아는 시민을 살해할 수 있다.")
    void mafiaCanKillCitizen() {
        Map<String, GameCharacter> gameCharacterMap = new HashMap<>();
        Mafia mafia = new Mafia(null);
        Citizen citizen = new Citizen(null);
        gameCharacterMap.put("mafiaSessionId", mafia);
        gameCharacterMap.put("citizenSessionId", citizen);
        when(gameRepository.findById(any()))
                .thenReturn(GameData.of(new GameSetting(), gameCharacterMap));

        gameCharacterService.kill(UUID.randomUUID(), "mafiaSessionId", "citizenSessionId");

        assertFalse(citizen.getIsAlive());
        assertThat(mafia.getKillCount(), equalTo(1));
    }

    @Test
    @DisplayName("마피아가 아닌 GameCharacter는 상대방을 살해할 수 없다.")
    void onlyMafiaCanKill() {
        Map<String, GameCharacter> gameCharacterMap = new HashMap<>();
        Citizen citizen1 = new Citizen(null);
        Citizen citizen2 = new Citizen(null);
        gameCharacterMap.put("citizen1SessionId", citizen1);
        gameCharacterMap.put("citizen2SessionId", citizen2);
        when(gameRepository.findById(any()))
                .thenReturn(GameData.of(new GameSetting(), gameCharacterMap));

        assertThrows(OnlyMafiaCanKillException.class, () ->
                gameCharacterService.kill(UUID.randomUUID(), "citizen1SessionId",
                        "citizen2SessionId")
        );
    }


}
