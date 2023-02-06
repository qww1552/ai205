package com.project.arc205.common.operation.operation;

public enum CharacterOperation implements Operation {
    MOVE,
    YOU_DIED, // 죽은 사람에게 보낼 시그널
    DIE // 죽은 사람 정보를 브로드캐스팅 할 때 보낼 시그널
}
