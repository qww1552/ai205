package com.project.arc205.gamecharacter.dto.response;


import com.project.arc205.gamecharacter.dto.Location;
import com.project.arc205.gamecharacter.dto.Player;
import com.project.arc205.gamecharacter.operation.Action;
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

