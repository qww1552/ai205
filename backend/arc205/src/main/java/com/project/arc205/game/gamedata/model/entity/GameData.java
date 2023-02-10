package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.event.Events;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.common.util.Constant;
import com.project.arc205.game.gamecharacter.exception.GameCharacterNotFoundException;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.event.GameEndEvent;
import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.InvalidTargetException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GameData {

    private UUID roomId;
    private int totalMissionCount;      //전체 미션 수
    private int completedMissionCount;  //현재 완료된 미션 수
    private int meetingLimitTime;       //회의 시간
    private int votingLimitTime;        //투표 시간
    private Map<String, String> voted;  //현재 투표 정보(from, to)    //TODO: refactor Vote
    private boolean inMeeting;      //TODO

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

    public int incrementAndGetMissionProgress() {
        return (int) (++completedMissionCount / (float) totalMissionCount) * 100;
    }

    public int getMissionProgress() {
        return (int) (((float) completedMissionCount / (double) totalMissionCount) * 100.0);
    }

//    public int getMissionProgress() {
//        AtomicInteger total = new AtomicInteger();
//        AtomicInteger complete = new AtomicInteger();
//        gameCharacters.values().stream().filter(v -> v.getRole() == Role.CITIZEN).forEach(v -> {
//            Map<String, ActiveMission> missions = v.getMissions();
//            total.addAndGet(missions.size());
//            complete.addAndGet(
//                    (int) missions.values().stream().filter(ActiveMission::isSolved).count());
//        });
//        return (int) (complete.doubleValue() / total.doubleValue() * 100);
//    }

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

    private int getSurvivorCount() {
        return (int) gameCharacters.values().stream()
                .filter(GameCharacter::getIsAlive).count();
    }

    private int getSurvivorCount(Role role) {
        return (int) gameCharacters.values().stream()
                .filter(c -> c.getRole() == role && c.getIsAlive()).count();
    }

    public void checkGameEnd() {
        int aliveMafiaCount = getSurvivorCount(Role.MAFIA);
        int aliveCitizenCount = getSurvivorCount(Role.CITIZEN);

        log.info("check game end: {}, {}", aliveCitizenCount, aliveMafiaCount);
        GameEndEvent gameEndEvent = null;
        if (aliveMafiaCount >= aliveCitizenCount) {
            gameEndEvent = new GameEndEvent(roomId, Role.MAFIA);
        } else if (aliveMafiaCount == 0 || totalMissionCount == completedMissionCount) {
            gameEndEvent = new GameEndEvent(roomId, Role.CITIZEN);
        }

        log.info("game end event: {}", gameEndEvent);
        if (gameEndEvent != null) {
            Events.raise(gameEndEvent);
        }
    }

    public GameCharacter getGameCharacter(String playerId) {
        return Optional.of(gameCharacters.get(playerId)).orElseThrow(
                GameCharacterNotFoundException::new);
    }


}
