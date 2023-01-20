package com.project.arc205.meeting.dto;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.operation.Action;
import com.project.arc205.operation.MeetingAction;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StartVotingResponse extends BaseResponse {
    public StartVotingResponse() {
        super(Action.MEETING, MeetingAction.START_VOTING);
    }
}
