package com.project.arc205.common.operation;

import com.project.arc205.common.operation.action.MeetingOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Type {
    MEETING(MeetingOperation.class);       //회의
    private final Class<?> action;
}
