package com.project.arc205.game.gamecharacter.dto.response;


import com.project.arc205.game.gamecharacter.model.common.Location;
import com.project.arc205.game.gamecharacter.dto.Player;
import com.project.arc205.game.gamecharacter.operation.Action;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class MoveResponse implements Serializable {

    Action action;
    Player player;
    Location location;

}

