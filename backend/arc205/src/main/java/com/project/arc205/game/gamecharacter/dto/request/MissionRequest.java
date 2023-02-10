package com.project.arc205.game.gamecharacter.dto.request;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class MissionRequest {

    @NotNull
    private String id;
}
