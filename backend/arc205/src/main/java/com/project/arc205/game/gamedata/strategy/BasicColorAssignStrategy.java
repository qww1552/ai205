package com.project.arc205.game.gamedata.strategy;

import org.springframework.stereotype.Component;

@Component
public class BasicColorAssignStrategy implements ColorAssignStrategy {

    private int color = 0;

    @Override
    public void init() {
        color = 0;
    }

    @Override
    public int next() {
        return color++;
    }
}
