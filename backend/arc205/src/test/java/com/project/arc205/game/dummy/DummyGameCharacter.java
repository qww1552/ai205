package com.project.arc205.game.dummy;

import com.project.arc205.game.gamecharacter.model.entity.Citizen;
import com.project.arc205.game.gamecharacter.model.entity.Mafia;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.HashMap;

public class DummyGameCharacter {

    public static Mafia getTestMafia() {
        return new Mafia("mafia", null);
    }

    public static Mafia getTestMafiaWithMission(HashMap<String, ActiveMission> missionMap) {
        return new Mafia("mafia", missionMap);
    }

    public static Citizen getTestCitizen() {
        return new Citizen("citizen", null);
    }

    public static Citizen getTestCitizenWithMission(HashMap<String, ActiveMission> missionMap) {
        return new Citizen("citizen", missionMap);
    }

}
