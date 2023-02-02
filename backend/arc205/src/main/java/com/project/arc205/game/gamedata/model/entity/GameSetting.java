package com.project.arc205.game.gamedata.model.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSetting {

    private Integer maxPlayers = 6;
    private Integer numberOfMafias = 1;
    private Integer numberOfMissions = 1;
    private Integer visionRange = 1;
    private Integer playerSpeed = 1;
    private Integer totalConferenceTime = 20;
    private Integer voteProgressTime = 10;

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
        if (incoming.totalConferenceTime != null) {
            this.totalConferenceTime = incoming.getTotalConferenceTime();
        }
        if (incoming.voteProgressTime != null) {
            this.voteProgressTime = incoming.getVoteProgressTime();
        }
    }
}
