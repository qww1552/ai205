package com.project.arc205.game.gamecharacter.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.gamecharacter.operation.Action;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class MoveResponse {

    Action action;
    @JsonProperty("player")
    PlayerResponse playerResponse;
    Location location;

}

