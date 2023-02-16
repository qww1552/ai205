package com.project.arc205.game.dummy;

import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.HashMap;
import java.util.Map;

public class DummyGameCharacter {

    public static Mafia getTestMafia() {
        return new Mafia("mafia", null, 1);
    }

    public static Mafia getTestMafiaWithMission(HashMap<String, ActiveMission> missionMap) {
        return new Mafia("mafia", missionMap, 1);
    }

    public static Citizen getTestCitizen() {
        ActiveMission mission = DummyMission.getTestMission();
        return new Citizen("citizen", Map.of(mission.getId(), mission), 0);
    }

    public static Citizen getTestCitizenWithMission(HashMap<String, ActiveMission> missionMap) {
        return new Citizen("citizen", missionMap, 0);
    }

}
