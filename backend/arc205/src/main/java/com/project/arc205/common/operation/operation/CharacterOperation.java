package com.project.arc205.common.operation.operation;

public enum CharacterOperation implements Operation {
    MOVE,
    KILL, // 죽이라는 요청에 쓰이는 시그널
    DIE // 죽었다는 응답에 쓰이는 시그널
}
