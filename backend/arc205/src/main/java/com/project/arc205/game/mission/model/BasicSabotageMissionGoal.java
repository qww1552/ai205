package com.project.arc205.game.mission.model;

import java.util.concurrent.atomic.AtomicInteger;
import lombok.Setter;
import lombok.ToString;

@ToString
public class BasicSabotageMissionGoal extends MissionGoal {

    @Setter
    private int targetCount;
    private AtomicInteger currentCount;

    public BasicSabotageMissionGoal(int targetCount) {
        this.targetCount = targetCount;
        currentCount = new AtomicInteger();
    }

    @Override
    public boolean solve() {
        return currentCount.incrementAndGet() == targetCount;
    }

    @Override
    public int getProgress() {
        return (int) (currentCount.doubleValue() * 100.0 / targetCount);
    }
}
