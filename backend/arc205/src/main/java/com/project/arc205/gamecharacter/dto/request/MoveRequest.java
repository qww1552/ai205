package com.project.arc205.gamecharacter.dto.request;

import com.project.arc205.gamecharacter.dto.Location;
import com.project.arc205.gamecharacter.dto.Player;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoveRequest implements Serializable {
    private Player player;
    private Location location;
}
