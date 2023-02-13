package com.project.arc205.game.gamedata.model.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSetting {

    private Long gameId = 1L;

    private Integer maxPlayers = 6;
    private Integer numberOfMafias = 1;
    private Integer numberOfMissions = 3;
    private Double visionRange = 1.0;
    private Double playerSpeed = 1.0;
    private Integer meetingLimitTime = 15;
    private Integer voteLimitTime = 120;
    private Integer killCoolTime = 10;
    private Integer meetingCoolTime = 15;

    public void update(GameSetting incoming) {
        if (incoming.maxPlayers != null) {
            this.maxPlayers = incoming.getMaxPlayers();
        }
        if (incoming.numberOfMafias != null) {
            this.numberOfMafias = incoming.getNumberOfMafias();
        }
        if (incoming.numberOfMissions != null) {
            this.numberOfMissions = incoming.getNumberOfMissions();
        }
        if (incoming.visionRange != null) {
            this.visionRange = incoming.getVisionRange();
        }
        if (incoming.playerSpeed != null) {
            this.playerSpeed = incoming.getPlayerSpeed();
        }
        if (incoming.meetingLimitTime != null) {
            this.meetingLimitTime = incoming.getMeetingLimitTime();
        }
        if (incoming.voteLimitTime != null) {
            this.voteLimitTime = incoming.getVoteLimitTime();
        }
    }
}
