package com.project.arc205.game.mission.model;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.exception.AlreadySolvedMissionException;
import com.project.arc205.game.mission.model.entity.GameMapMission;

public class BasicActiveMission extends ActiveMission {


    public BasicActiveMission(String id, String title, Location location) {
        super(id, title, location);
    }

    public static BasicActiveMission of(GameMapMission mission) {
        return new BasicActiveMission(mission.getMission().getId().toString(),
                mission.getMission().getTitle(),
                mission.getLocation());
    }

    @Override
    public boolean solve() {
        if (solved) {
            throw new AlreadySolvedMissionException(this.id);
        }
        return this.solved = true;
    }
}
