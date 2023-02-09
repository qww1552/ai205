package com.project.arc205.game.gamedata.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.mission.model.ActiveMission;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GameStartPersonalResponse {

    @JsonIgnore
    private final String sessionId;
    private final Role role;
    private final Location location;
    private final int color;
    private final List<Mission> missions;

    public static GameStartPersonalResponse of(String sessionId, GameCharacter character) {
        Map<String, ActiveMission> entityMissions = character.getMissions();
        List<Mission> missions = new ArrayList<>(entityMissions.size());
        entityMissions.forEach((k, v) -> missions.add(Mission.of(v)));
        return new GameStartPersonalResponse(sessionId, character.getRole(),
                character.getLocation(), character.getColor(), missions);
    }

    @Getter
    @RequiredArgsConstructor
    public static class Mission {

        private final String id;
        private final String title;

        private static Mission of(ActiveMission mission) {
            return new Mission(mission.getId().toString(), mission.getTitle());
        }
    }
}
