package com.project.arc205.game.gamedata.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

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
    @Range(min = 1, max = 5)
    private Double visionRange;
    @NotNull
    @Range(min = 1, max = 3)
    private Double playerSpeed;
    @NotNull
    @Range(min = 0, max = 120)
    private Integer totalConferenceTime;
    @NotNull
    @Range(min = 0, max = 300)
    private Integer voteProgressTime;

    @NotNull
    @Range(min = 10, max = 60)
    private Integer killCoolTime;

    @NotNull
    @Range(min = 0, max = 60)
    private Integer meetingCoolTime;

}
