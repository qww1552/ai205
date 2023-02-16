package com.project.arc205.game.gamecharacter;

import static com.project.arc205.game.dummy.DummyGameCharacter.getTestCitizenWithMission;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.project.arc205.game.dummy.DummyMission;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.HashMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class CitizenTests {

    private ActiveMission dummyMission;


    @BeforeEach
    void init() {
        dummyMission = DummyMission.getTestMission();
    }

    @Test
    @DisplayName("시민은 미션을 수행할 수 있다.")
    void citizenSolveMission() {
        String missionId = "test";
        HashMap<String, ActiveMission> missionMap = new HashMap<>();
        missionMap.put(missionId, dummyMission);
        GameCharacter gameCharacter = getTestCitizenWithMission(missionMap);
        gameCharacter.interaction(missionId);
        assertTrue(dummyMission.isSolved());
    }
}
