package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.Constant;
import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.gamedata.strategy.BasicGameCharacterAssignStrategy;
import com.project.arc205.game.gamedata.strategy.GameCharacterAssignStrategy;
import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.InvalidTargetException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import com.project.arc205.game.room.model.entity.Room;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
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
    private boolean inMeeting;

    private Map<String, GameCharacter> gameCharacters;  //캐릭터 정보(key: playerId, value: GameCharacter)

    //TODO: change private
    public GameData(int totalMissionCount, int aliveCitizenCount, int aliveMafiaCount,
            int meetingLimitTime, int votingLimitTime, Map<String, GameCharacter> gameCharacters) {
        this.totalMissionCount = totalMissionCount;
        this.completedMissionCount = 0;
        this.aliveCitizenCount = aliveCitizenCount;
        this.aliveMafiaCount = aliveMafiaCount;
        this.meetingLimitTime = meetingLimitTime;
        this.votingLimitTime = votingLimitTime;
        this.gameCharacters = gameCharacters;
        this.voted = null;
        this.inMeeting = false;
    }

    public static GameData of(Room room) {
        GameSetting gameSetting = room.getGameSetting();
        Map<String, Player> players = room.getPlayers();

        GameCharacterAssignStrategy strategy = new BasicGameCharacterAssignStrategy(players,
                new Location(0.0, 0.0));

        Map<String, GameCharacter> characters = strategy.getCharacters();

        GameData gameData = new GameData(gameSetting.getNumberOfMissions(),
                gameSetting.getMaxPlayers() - gameSetting.getNumberOfMafias(),
                gameSetting.getNumberOfMafias(),
                gameSetting.getTotalMeetingTime() - gameSetting.getVoteLimitTime(),
                gameSetting.getVoteLimitTime(), characters);   //TODO: 수정 필요

        return gameData;
    }

    public boolean meetingStart() {
        if (inMeeting) {
            return false;
        }
        return inMeeting = true;
    }

    public void meetingEnd() {
        inMeeting = false;
    }

    public List<String> getSurvivors() {
        return gameCharacters.entrySet().stream().filter(e -> e.getValue().getIsAlive())
                .map(Map.Entry::getKey).collect(Collectors.toList());
    }

    public int getSurvivorCount() {
        return aliveCitizenCount + aliveMafiaCount;
    }

    public void votingStart() {
        voted = new HashMap<>(getSurvivorCount());
    }

    public void votingEnd() {
        voted = null;
    }

    public int vote(String from, String to) {
        if (voted == null) {
            throw new NotVotingPeriodException();
        }
        if (voted.containsKey(from)) {
            throw new AlreadyVotedException();
        }
        if (!to.equals(Constant.VOTED_SKIP_ID) && !gameCharacters.containsKey(to)) {
            throw new InvalidTargetException(to);
        }
        voted.put(from, to);
        return getSurvivorCount() - voted.size();      //return remainingVotingTicket
    }
}
