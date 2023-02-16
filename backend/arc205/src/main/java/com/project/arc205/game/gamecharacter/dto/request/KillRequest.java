package com.project.arc205.game.gamecharacter.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KillRequest {

    @NotNull
    private String to; //player to kill

}
