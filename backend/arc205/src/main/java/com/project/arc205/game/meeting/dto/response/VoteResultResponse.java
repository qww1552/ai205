package com.project.arc205.game.meeting.dto.response;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class VoteResultResponse {

    private final List<VoteResult> voteResults;
    private final String elected;

    public static VoteResultResponse of(Map<String, List<String>> voteResults, String elected) {
        List<VoteResult> results = voteResults.entrySet().stream()
                .map(e -> VoteResultResponse.VoteResult.of(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
        return new VoteResultResponse(results, elected);
    }

    @Getter
    @AllArgsConstructor(staticName = "of")
    private static class VoteResult {

        private final String id;
        private final List<String> from;
    }
}
