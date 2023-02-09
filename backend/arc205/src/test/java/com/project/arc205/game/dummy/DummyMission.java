package com.project.arc205.game.dummy;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.mission.model.ActiveMission;

public class DummyMission extends ActiveMission {

    public DummyMission(Long id, String title, Location location) {
        super(id, title, location);
    }

    @Override
    public boolean solve() {
        solved = true;
        return true;
    }
}