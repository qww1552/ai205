package com.project.arc205.game.gamecharacter.dto.response;

import com.project.arc205.game.mission.model.ActiveMission;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MissionCompleteResponse {

    private Mission mission;

    public static MissionCompleteResponse of(String id, boolean solved) {
        return new MissionCompleteResponse(new Mission(id, solved));
    }

    public static MissionCompleteResponse of(ActiveMission mission) {
        return new MissionCompleteResponse(Mission.of(mission));
    }

    @Getter
    @ToString
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class Mission {

        private String id;
        private boolean solved;

        private static Mission of(ActiveMission mission) {
            return new Mission(mission.getId(), mission.isSolved());
        }
    }
}
