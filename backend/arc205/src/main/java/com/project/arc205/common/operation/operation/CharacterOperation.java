package com.project.arc205.common.operation.operation;

public enum CharacterOperation implements Operation {
    MOVE,
    YOU_DIED,   // 죽은 사람에게 보낼 시그널
    DIE,        // 죽은 사람 정보를 브로드캐스팅 할 때 보낼 시그널
    MISSION_COMPLETE,   //개인 미션 완료 체크 시그널
    MISSION_PROGRESS,    //미션 전체 진행률 시그널
    SABOTAGE_OPEN, // 사보타지 시작
    SABOTAGE_CLOSE // 사보타지 해결

}
