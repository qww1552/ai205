package com.project.arc205.game.meeting.dto.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class VoteRequest {

    @Setter
    private String from;    //TODO: remove
    @NotNull
    private String to;
}
