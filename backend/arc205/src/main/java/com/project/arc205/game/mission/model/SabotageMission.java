package com.project.arc205.game.mission.model;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.exception.AlreadySolvedMissionException;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import lombok.Setter;
import lombok.ToString;

@ToString
public class SabotageMission extends ActiveMission {

    @Setter
    protected MissionGoal goals;

    public SabotageMission(String id, String title, Location location, MissionGoal goals) {
        super(id, title, location);
        this.goals = goals;
    }

    public static SabotageMission of(GameMapMission mission, MissionGoal goals) {
        return new SabotageMission(mission.getMission().getId().toString(),
                mission.getMission().getTitle(),
                mission.getLocation(), goals);
    }

    @Override
    public boolean solve() {
        if (isSolved()) {
            throw new AlreadySolvedMissionException(this.id);
        }
        return solved = goals.solve();
    }

    public int getProgress() {
        return goals.getProgress();
    }
}
