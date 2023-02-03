package com.project.arc205.game.gamedata.model.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSetting {

    private Integer maxPlayers = 6;
    private Integer numberOfMafias = 1;
    private Integer numberOfMissions = 1;
    private Double visionRange = 1.0;
    private Double playerSpeed = 1.0;
    private Integer meetingLimitTime = 20;
    private Integer voteLimitTime = 10;

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
