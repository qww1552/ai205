package com.project.arc205.game.meeting.dto.response;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MeetingStartResponse {

    private final List<Player> players;       //플레이어들 상태 정보(생존 여부)

    static public BaseResponse<MeetingStartResponse> newBaseResponse(
            Map<String, GameCharacter> gameCharacters) {
        List<MeetingStartResponse.Player> players = new ArrayList<>();
        gameCharacters.forEach((id, gameCharacter) ->
                players.add(MeetingStartResponse.Player.of(id, gameCharacter.getIsAlive()))
        );

        return BaseResponse.of(Type.MEETING, MeetingOperation.START,
                new MeetingStartResponse(players));
    }

    @Getter
    @AllArgsConstructor(staticName = "of")
    private static class Player {

        String id;
        boolean isAlive;
    }
}
