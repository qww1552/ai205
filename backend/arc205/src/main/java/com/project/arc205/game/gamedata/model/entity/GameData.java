package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.Constant;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.InvalidTargetException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.*;
import java.util.stream.Collectors;

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

    private Map<String, GameCharacter> gameCharacters;  //캐릭터 정보(key: playerId, value: GameCharacter)

    public GameData(int totalMissionCount,
                    int aliveCitizenCount, int aliveMafiaCount,
                    int meetingLimitTime, int votingLimitTime,
                    Map<String, GameCharacter> gameCharacters) {
        this.totalMissionCount = totalMissionCount;
        this.completedMissionCount = 0;
        this.aliveCitizenCount = aliveCitizenCount;
        this.aliveMafiaCount = aliveMafiaCount;
        this.meetingLimitTime = meetingLimitTime;
        this.votingLimitTime = votingLimitTime;
        this.gameCharacters = gameCharacters;
        this.voted = null;
    }

    public List<String> getSurvivors() {
        return gameCharacters.entrySet().stream().filter(e -> e.getValue().getIsAlive()).map(Map.Entry::getKey).collect(Collectors.toList());
    }
    private int getSurvivorCount() {
        return aliveCitizenCount + aliveMafiaCount;
    }
    public void startVote() {
        voted = new HashMap<>(getSurvivorCount());
    }
    public void endVote() {
        voted = null;
    }
    public int vote(String from, String to) {
        if (voted == null) {
            throw new NotVotingPeriodException();
        }
        if (voted.containsKey(from)) {
            throw new AlreadyVotedException();
        }
        if (!to.equals(Constant.votedSkipId) && !gameCharacters.containsKey(to)) {
            throw new InvalidTargetException(to);
        }
        voted.put(from, to);
        return getSurvivorCount() - voted.size();      //return remainingVotingTicket
    }
}
