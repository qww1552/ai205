package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.Constant;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.InvalidTargetException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameData {

    private UUID roomId;
    private int totalMissionCount;      //전체 미션 수
    private int completedMissionCount;  //현재 완료된 미션 수
    private int aliveCitizenCount;      //시민 생존자 수
    private int aliveMafiaCount;        //마피아 생존자 수
    private int meetingLimitTime;       //회의 시간
    private int votingLimitTime;        //투표 시간
    private Map<String, String> voted;  //현재 투표 정보(from, to)
    private boolean inMeeting;

    private Map<String, GameCharacter> gameCharacters;  //캐릭터 정보(key: playerId, value: GameCharacter)

    @Builder
    private GameData(UUID roomId, int totalMissionCount,
            int meetingLimitTime, int votingLimitTime, Map<String, GameCharacter> gameCharacters) {
        this.roomId = roomId;
        this.totalMissionCount = totalMissionCount;
        this.completedMissionCount = 0;
        this.meetingLimitTime = meetingLimitTime;
        this.votingLimitTime = votingLimitTime;
        this.gameCharacters = gameCharacters;
        this.voted = null;
        this.inMeeting = false;
    }

    public static GameData of(UUID roomId, GameSetting gameSetting,
            Map<String, GameCharacter> gameCharacters) {

        int citizenCount = gameSetting.getMaxPlayers() - gameSetting.getNumberOfMafias();

        return GameData.builder()
                .roomId(roomId)
                .totalMissionCount(gameSetting.getNumberOfMissions() * citizenCount)
                .meetingLimitTime(gameSetting.getMeetingLimitTime())
                .votingLimitTime(gameSetting.getVoteLimitTime())
                .gameCharacters(gameCharacters)
                .build();
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

    public void moveGameCharactersTo(Location location) {
        for (GameCharacter gameCharacter : gameCharacters.values()) {
            gameCharacter.setLocation(location);
        }
    }

    public void kill(String playerId) {
        GameCharacter deadCharacter = gameCharacters.get(playerId);
        deadCharacter.die();
        if (deadCharacter.getRole().equals(Role.CITIZEN)) {
            this.aliveCitizenCount--;
        } else if (deadCharacter.getRole().equals(Role.MAFIA)) {
            this.aliveMafiaCount--;
        }
    }

    public Role getWinRole() {
        if (aliveMafiaCount == aliveCitizenCount)
            return Role.MAFIA;
        else if (aliveMafiaCount == 0 || totalMissionCount == completedMissionCount)
            return Role.CITIZEN;
        return null;
    }
}
