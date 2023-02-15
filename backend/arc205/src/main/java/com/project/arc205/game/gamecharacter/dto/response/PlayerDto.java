package com.project.arc205.game.gamecharacter.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor(staticName = "of")
public class PlayerDto {

    private final String id;
}
