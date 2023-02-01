package com.project.arc205.game.gamecharacter.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.arc205.common.model.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class MoveResponse {
    @JsonProperty("player")
    PlayerResponse playerResponse;
    Location location;

}

