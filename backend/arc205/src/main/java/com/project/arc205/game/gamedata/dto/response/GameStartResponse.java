package com.project.arc205.game.gamedata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(staticName = "of")
public class GameStartResponse {

    private String id;
    // TODO: 2023-02-02 게임이 시작될 때 전달해야할 정보
}
