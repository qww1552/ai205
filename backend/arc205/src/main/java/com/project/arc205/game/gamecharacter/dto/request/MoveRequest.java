package com.project.arc205.game.gamecharacter.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.arc205.game.gamecharacter.model.common.Location;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoveRequest {
    @JsonProperty("player")
    private PlayerRequest playerRequest;
    private Location location;
}
