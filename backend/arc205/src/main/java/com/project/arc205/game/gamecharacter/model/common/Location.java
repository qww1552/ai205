package com.project.arc205.game.gamecharacter.model.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Location implements Serializable {
    private int y, x;
}
