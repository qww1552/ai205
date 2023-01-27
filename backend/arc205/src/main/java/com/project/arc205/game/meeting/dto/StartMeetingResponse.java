package com.project.arc205.game.meeting.dto;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.action.MeetingOperation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class StartMeetingResponse {
    @Getter
    @AllArgsConstructor
    public static class Player {
        String id;
        boolean alive;
    }
    private final List<Player> players;       //플레이어들 상태 정보(생존 여부)

    static public BaseResponse<StartMeetingResponse> of(List<Player> players) {
        return BaseResponse.of(Type.MEETING, MeetingOperation.START, new StartMeetingResponse(players));
    }
}
