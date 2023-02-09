package com.project.arc205.game.gamecharacter;

import static com.project.arc205.game.dummy.DummyGameCharacter.getTestCitizen;
import static com.project.arc205.game.dummy.DummyGameCharacter.getTestMafia;
import static com.project.arc205.game.dummy.DummyGameCharacter.getTestMafiaWithMission;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.project.arc205.game.dummy.DummyMission;
import com.project.arc205.game.gamecharacter.exception.CannotKillDeadException;
import com.project.arc205.game.gamecharacter.exception.MafiaCannotKillEachOtherException;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.HashMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class MafiaTests {

    private GameCharacter gameCharacter;
    private ActiveMission dummyMission;


    @BeforeEach
    void init() {
        dummyMission = DummyMission.getTestMission();
    }

    @Test
    @DisplayName("마피아는 미션을 수행해도 아무일도 일어나지 않는다.")
    void mafiaSolveMission() {
        String missionId = "test";
        HashMap<String, ActiveMission> missionMap = new HashMap<>();
        missionMap.put(missionId, dummyMission);
        gameCharacter = getTestMafiaWithMission(missionMap);
        gameCharacter.interaction(missionId);
        assertFalse(dummyMission.isSolved());
    }

    @Test
    @DisplayName("마피아는 시민을 죽일 수 있다.")
    void mafiaCanKillCitizen() {
        gameCharacter = getTestCitizen();
        Mafia mafia = getTestMafiaWithMission(new HashMap<>());

        mafia.kill(gameCharacter);
        assertFalse(gameCharacter.getIsAlive());
    }

    @Test
    @DisplayName("마피아가 마피아를 죽이면 예외가 발생한다.")
    void mafiaCannotKillMafia() {
        gameCharacter = getTestMafia();
        Mafia mafia = getTestMafia();

        assertThrows(MafiaCannotKillEachOtherException.class,
                () -> mafia.kill(gameCharacter));
        assertTrue(gameCharacter.getIsAlive());
    }

    @Test
    @DisplayName("kill 호출 시 이미 죽은 상대라면 예외가 발생한다.")
    void killDeadWillThrowException() {
        Mafia testMafia = getTestMafia();
        Citizen testCitizen = getTestCitizen();
        testCitizen.die();
        assertThrows(CannotKillDeadException.class, () -> testMafia.kill(testCitizen));
    }

}