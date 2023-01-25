package com.project.arc205.meeting.dto;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.operation.Action;
import com.project.arc205.operation.MeetingAction;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StartMeetingResponse extends BaseResponse {
    public StartMeetingResponse() {
        super(Action.MEETING, MeetingAction.START);
    }
    //TODO: 현재 플레이어들 상태 정보
    //      죽은 플레이어 목록?
}
