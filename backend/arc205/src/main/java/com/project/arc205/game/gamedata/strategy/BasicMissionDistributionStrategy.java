package com.project.arc205.game.gamedata.strategy;

import static java.util.stream.Collectors.toMap;

import com.project.arc205.game.mission.model.ActiveMission;
import com.project.arc205.game.mission.model.BasicActiveMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class BasicMissionDistributionStrategy implements
        MissionDistributionStrategy {

    private List<GameMapMission> missionPool;
    private int numberOfMissions;

    private <T> List<T> randomCombination(List<T> list, int size) {
        Collections.shuffle(list);
        return list.subList(0, size);
    }

    @Override
    public void init(List<GameMapMission> missionPool, int numberOfMissions) {
        this.missionPool = missionPool;
        this.numberOfMissions = numberOfMissions;
    }

    @Override
    public Map<String, ActiveMission> next() {
        var missionCombi = randomCombination(this.missionPool, numberOfMissions);
        return missionCombi.stream().collect(
                toMap(m -> m.getMission().getId().toString(), BasicActiveMission::of,
                        (a, b) -> b, ConcurrentHashMap::new));
    }
}
