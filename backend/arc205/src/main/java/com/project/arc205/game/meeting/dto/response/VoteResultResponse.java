package com.project.arc205.game.meeting.dto.response;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class VoteResultResponse {
    @Getter
    @AllArgsConstructor(staticName = "of")
    private static class VoteResult {
        private final String id;
        private final List<String> from;
    }

    private final List<VoteResult> voteResults;
    private final String elected;

    private VoteResultResponse(Map<String, List<String>> voteResults, String elected) {
        this.voteResults = voteResults.entrySet().stream()
                .map(e -> VoteResultResponse.VoteResult.of(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
        this.elected = elected;
    }
    public static BaseResponse<VoteResultResponse> newBaseResponse(Map<String, List<String>> voteResults, String elected) {
        return BaseResponse.of(Type.MEETING, MeetingOperation.END, new VoteResultResponse(voteResults, elected));
    }
}
