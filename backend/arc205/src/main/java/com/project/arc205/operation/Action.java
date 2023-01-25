package com.project.arc205.operation;

import lombok.AllArgsConstructor;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
public enum Action {
    MEETING(Arrays.asList(MeetingAction.values()))        //회의
    ;
    private final List<SubAction> subActions;
}
