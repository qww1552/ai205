package com.project.arc205.game.mission.model;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.mission.model.entity.GameMapMission;

public class BasicActiveMission extends ActiveMission {


    public BasicActiveMission(Long id, String title, Location location) {
        super(id, title, location);
    }

    public static BasicActiveMission of(GameMapMission mission) {
        return new BasicActiveMission(mission.getMission().getId(), mission.getMission().getTitle(),
                mission.getLocation());
    }

    @Override
    public boolean solve() {
        return this.solved = true;
    }
}
