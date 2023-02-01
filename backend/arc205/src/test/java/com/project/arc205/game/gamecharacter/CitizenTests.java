package com.project.arc205.game.gamecharacter;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.mission.ActiveMission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CitizenTests {

    private GameCharacter gameCharacter;
    private ActiveMission dummyMission;

    static class DummyMission extends ActiveMission {

        @Override
        public boolean solve() {
            solved = true;
            return true;
        }
    }

    @BeforeEach
    void init() {
        dummyMission = new DummyMission();
        dummyMission.setTitle("dummy");
    }

    @Test
    @DisplayName("시민은 미션을 수행할 수 있다.")
    void citizenSolveMission() {
        String missionId = "test";
        HashMap<String, ActiveMission> missionMap = new HashMap<>();
        missionMap.put(missionId, dummyMission);
        gameCharacter = new Citizen(new Location(0.0, 0.0), missionMap);
        gameCharacter.interaction(missionId);
        assertTrue(dummyMission.isSolved());
    }
}
