package com.project.arc205.game.mission;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class Mission {
    protected String title;
    public abstract boolean solve();
}
