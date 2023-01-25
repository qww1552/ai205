package com.project.arc205.operation;

public enum MeetingAction implements SubAction {
    START,          //회의 시작
    START_VOTING,   //투표 시작
    VOTE,           //투표
    END,            //회의 종료
}
