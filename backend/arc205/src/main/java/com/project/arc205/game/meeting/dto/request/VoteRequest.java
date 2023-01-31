package com.project.arc205.game.meeting.dto.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VoteRequest {
    @NotNull
    private String from;
    @NotNull
    private String to;
}
