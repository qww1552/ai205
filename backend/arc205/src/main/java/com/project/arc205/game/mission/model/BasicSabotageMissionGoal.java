package com.project.arc205.game.mission.model;

import lombok.Setter;
import lombok.ToString;

@ToString
public class BasicSabotageMissionGoal extends MissionGoal {

    @Setter
    private int targetCount;
    private int currentCount;

    public BasicSabotageMissionGoal(int targetCount) {
        this.targetCount = targetCount;
        this.currentCount = 0;
    }

    @Override
    public boolean solve() {
        return ++currentCount == targetCount;
    }

    @Override
    public int getProgress() {
        return (int) (currentCount * 100.0 / targetCount);
    }
}
