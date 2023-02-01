package com.project.arc205.game.gamecharacter;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.mission.ActiveMission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CitizenTests {

    private GameCharacter gameCharacter;
    private ActiveMission dummyMission;

    class DummyMission extends ActiveMission {

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
        gameCharacter = new Citizen(new Location(0.0, 0.0));
        String missionId = "test";
        gameCharacter.addMission(missionId, dummyMission);
        gameCharacter.interaction(missionId);
        assertTrue(dummyMission.isSolved());
    }
}
