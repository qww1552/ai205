package com.project.arc205.game.gamecharacter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor(staticName = "of")
public class MissionProgressResponse {

    private int progress;   //진행률(%)
}
