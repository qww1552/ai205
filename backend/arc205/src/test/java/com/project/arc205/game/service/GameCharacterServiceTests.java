package com.project.arc205.game.service;

import static com.project.arc205.game.dummy.DummyGameCharacter.getTestCitizen;
import static com.project.arc205.game.dummy.DummyGameCharacter.getTestMafia;
import static com.project.arc205.game.dummy.DummyGameData.getTestGameDataWithGameCharacter;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.dto.request.MoveRequest;
import com.project.arc205.game.gamecharacter.exception.OnlyMafiaCanKillException;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.gamecharacter.service.GameCharacterService;
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
        Mafia mafia = getTestMafia();
        Citizen citizen = getTestCitizen();
        gameCharacterMap.put(mafia.getPlayerId(), mafia);
        gameCharacterMap.put(citizen.getPlayerId(), citizen);
        when(gameRepository.findById(any()))
                .thenReturn(getTestGameDataWithGameCharacter(gameCharacterMap));

        gameCharacterService.kill(UUID.randomUUID(), mafia.getPlayerId(), citizen.getPlayerId());

        assertFalse(citizen.getIsAlive());
        assertThat(mafia.getKillCount(), equalTo(1));
    }

    @Test
    @DisplayName("마피아가 아닌 GameCharacter는 상대방을 살해할 수 없다.")
    void onlyMafiaCanKill() {
        Map<String, GameCharacter> gameCharacterMap = new HashMap<>();
        Citizen citizen1 = getTestCitizen();
        Citizen citizen2 = getTestCitizen();
        gameCharacterMap.put(citizen1.getPlayerId(), citizen1);
        gameCharacterMap.put(citizen2.getPlayerId(), citizen2);
        when(gameRepository.findById(any()))
                .thenReturn(getTestGameDataWithGameCharacter(gameCharacterMap));

        assertThrows(OnlyMafiaCanKillException.class, () ->
                gameCharacterService.kill(UUID.randomUUID(), citizen1.getPlayerId(),
                        citizen2.getPlayerId())
        );
    }

    @Test
    @DisplayName("GameChacterService의 move 호출 시 해당 캐릭터가 이동한다.")
    void gameCharacterCanMove() {
        Map<String, GameCharacter> gameCharacterMap = new HashMap<>();
        Citizen citizen = getTestCitizen();
        String citizenPlayerId = "citizenPlayerId";
        gameCharacterMap.put(citizenPlayerId, citizen);
        citizen.setLocation(new Location(0.0, 0.0));
        when(gameRepository.findById(any()))
                .thenReturn(getTestGameDataWithGameCharacter(gameCharacterMap));

        MoveRequest moveRequest = new MoveRequest();
        Location newLocation = new Location(1.1, 1.1);
        moveRequest.setLocation(newLocation);
        gameCharacterService.move(UUID.randomUUID(), citizenPlayerId, moveRequest.getLocation());

        assertThat(citizen.getLocation(), equalTo(newLocation));
    }
}
