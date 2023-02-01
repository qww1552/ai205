package com.project.arc205.game.gamecharacter;

import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.mission.Mission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CitizenTests {

    private GameCharacter gameCharacter;
    private Mission dummyMission;
    private boolean solved = false;

    class DummyMission extends Mission {

        @Override
        public boolean solve() {
            solved = true;
            return true;
        }
    }

    @BeforeEach
    void init() {
        solved = false;
        dummyMission = new DummyMission();
        dummyMission.setTitle("dummy");
    }

    @Test
    @DisplayName("시민은 미션을 수행할 수 있다.")
    void citizenSolveMission() {
        gameCharacter = new Citizen(new Location(0.0, 0.0));
        gameCharacter.interaction(dummyMission);
        assertTrue(solved);
    }
}
