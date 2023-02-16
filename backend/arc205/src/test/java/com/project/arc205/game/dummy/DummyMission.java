package com.project.arc205.game.dummy;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.mission.model.ActiveMission;

public class DummyMission extends ActiveMission {

    public DummyMission(String id, String title, Location location) {
        super(id, title, location);
    }

    public static DummyMission getInstance() {
        return new DummyMission("1", "dummy", new Location(0.0, 0.0));
    }

    @Override
    public boolean solve() {
        solved = true;
        return true;
    }
}