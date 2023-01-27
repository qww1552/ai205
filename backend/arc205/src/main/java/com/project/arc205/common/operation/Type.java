package com.project.arc205.common.operation;

import com.project.arc205.common.operation.operation.MeetingOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum Type {
    EXCEPTION(HttpStatus.class),
    MEETING(MeetingOperation.class);       //회의
    private final Class<?> subType;
}