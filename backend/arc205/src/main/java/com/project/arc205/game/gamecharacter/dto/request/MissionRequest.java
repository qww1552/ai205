package com.project.arc205.game.gamecharacter.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MissionRequest {

    @NotNull
    private String id;
}
