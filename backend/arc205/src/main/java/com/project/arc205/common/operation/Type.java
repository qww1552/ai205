package com.project.arc205.common.operation;

import com.project.arc205.common.operation.operation.CharacterOperation;
import com.project.arc205.common.operation.operation.GameOperation;
import com.project.arc205.common.operation.operation.MeetingOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum Type {
    EXCEPTION(HttpStatus.class),
    MEETING(MeetingOperation.class),       //회의
    CHARACTER(CharacterOperation.class),
    GAME(GameOperation.class);
    private final Class<?> subType;
}
