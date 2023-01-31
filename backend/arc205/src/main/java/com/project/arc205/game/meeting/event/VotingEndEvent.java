package com.project.arc205.game.meeting.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VotingEndEvent {
    private final String roomId;

}
