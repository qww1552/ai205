package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class GameData {
    private int totalMissionCount;      //전체 미션 수
    private int completedMissionCount;  //현재 완료된 미션 수
    private int aliveCitizenCount;      //시민 생존자 수
    private int aliveMafiaCount;        //마피아 생존자 수
    private int meetingLimitTime;       //회의 시간
    private int votingLimitTime;        //투표 시간
    private Map<String, String> voted;  //현재 투표 정보(from, to)

    public GameData(int totalMissionCount, int aliveCitizenCount, int aliveMafiaCount, int meetingLimitTime, int votingLimitTime) {
        this.totalMissionCount = totalMissionCount;
        this.completedMissionCount = 0;
        this.aliveCitizenCount = aliveCitizenCount;
        this.aliveMafiaCount = aliveMafiaCount;
        this.meetingLimitTime = meetingLimitTime;
        this.votingLimitTime = votingLimitTime;
        this.voted = null;
    }
    private int getAliveCount() {
        return aliveCitizenCount + aliveMafiaCount;
    }
    public void startVote() {
        voted = new HashMap<>(getAliveCount());
    }
    public void endVote() {
        voted = null;
    }
    public void votedFor(String from, String to) {
        if (voted == null) {
            throw new NotVotingPeriodException();
        }
        if (voted.containsKey(from)) {
            throw new AlreadyVotedException();
        }
        //TODO: to가 잘못된 대상일 경우 예외처리
        voted.put(from, to);
    }

    public List<?> getVoteResult() {
        //TODO
        return null;
    }
    public boolean isVotingEnd() {
        return voted.size() == getAliveCount();
    }
}
