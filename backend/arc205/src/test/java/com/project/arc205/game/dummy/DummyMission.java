package com.project.arc205.game.dummy;

import com.project.arc205.game.mission.ActiveMission;

public class DummyMission extends ActiveMission {

    @Override
    public boolean solve() {
        solved = true;
        return true;
    }
}