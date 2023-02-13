package com.project.arc205.game.gamedata.strategy;

import com.project.arc205.game.mission.model.ActiveMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.List;
import java.util.Map;

public interface MissionDistributionStrategy {

    void init(List<GameMapMission> missionPool, int numberOfMissions);

    Map<String, ActiveMission> next();
}
