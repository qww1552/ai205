package com.project.arc205.game.meeting.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class VotedResponse {

    private final Player player;
    private final int remainingVoteTicket;

    static public VotedResponse of(String playerId,
            int remainingVoteTicket) {
        return new VotedResponse(Player.of(playerId), remainingVoteTicket);
    }

    @Getter
    @AllArgsConstructor(staticName = "of")
    private static class Player {

        String id;
    }
}
