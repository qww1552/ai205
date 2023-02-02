package com.project.arc205.game.gamedata.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSettingRequest {

    @NotNull
    @Min(1)
    private Integer maxPlayers;
    @NotNull
    @Min(1)
    private Integer numberOfMafias;
    @NotNull
    private Integer numberOfMissions;
    @NotNull
    private Integer visionRange;
    @NotNull
    private Integer playerSpeed;
    @NotNull
    private Integer totalConferenceTime;
    @NotNull
    private Integer voteProgressTime;

}
