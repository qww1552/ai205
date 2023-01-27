package com.project.arc205.game.gamecharacter.model.entity;

import com.project.arc205.game.room.model.entity.Room;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {

    private Long id;
    private String name;
    private Room room;
    private GameCharacter gameCharacter;

}
