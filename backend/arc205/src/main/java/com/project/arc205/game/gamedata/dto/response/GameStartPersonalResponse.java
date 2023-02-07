package com.project.arc205.game.gamedata.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GameStartPersonalResponse {

    @JsonIgnore
    private final String sessionId;
    private final Role role;
    private final Location location;
    private final int color;
    //TODO: mission
//    private final List<Mission> missions;

    public static GameStartPersonalResponse of(String sessionId, GameCharacter character,
            int color) {
        return new GameStartPersonalResponse(sessionId, character.getRole(),
                character.getLocation(), color);
    }

    public static BaseResponse<GameStartPersonalResponse> newBaseResponse(
            GameStartPersonalResponse gameStartPersonalResponse) {
        return BaseResponse.of(Type.GAME, GameOperation.START_PERSONAL, gameStartPersonalResponse);
    }
}
