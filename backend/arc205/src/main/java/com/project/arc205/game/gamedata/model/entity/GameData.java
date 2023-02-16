package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.event.Events;
import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.Role;
import com.project.arc205.common.util.Constant;
import com.project.arc205.game.gamecharacter.exception.GameCharacterNotFoundException;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.event.GameEndEvent;
import com.project.arc205.game.gamedata.event.MissionProgressChangeEvent;
import com.project.arc205.game.gamedata.model.exception.SabotageNotActiveException;
import com.project.arc205.game.meeting.exception.AlreadyVotedException;
import com.project.arc205.game.meeting.exception.InvalidTargetException;
import com.project.arc205.game.meeting.exception.NotVotingPeriodException;
import com.project.arc205.game.mission.model.ActiveMission;
import com.project.arc205.game.mission.model.BasicSabotageMissionGoal;
import com.project.arc205.game.mission.model.SabotageMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
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
    private Sabotage sabotage;

    private Map<String, GameCharacter> gameCharacters;  //캐릭터 정보(key: playerId, value: GameCharacter)

    @Builder
    private GameData(UUID roomId,
            int meetingLimitTime, int votingLimitTime, Map<String, GameCharacter> gameCharacters,
            int sabotageCoolTime,
            Location startLocation) {
        this.roomId = roomId;
        this.meetingLimitTime = meetingLimitTime;
        this.votingLimitTime = votingLimitTime;
        this.gameCharacters = gameCharacters;
        this.voted = null;
        this.inMeeting = false;
        this.sabotage = new Sabotage(this.roomId, sabotageCoolTime);
        moveGameCharactersTo(startLocation);
        refreshMissionCount();
    }

    public static GameData of(UUID roomId, GameSetting gameSetting,
            Map<String, GameCharacter> gameCharacters, Location startLocation) {
        return GameData.builder()
                .roomId(roomId)
                .meetingLimitTime(gameSetting.getMeetingLimitTime())
                .votingLimitTime(gameSetting.getVoteLimitTime())
                .gameCharacters(gameCharacters)
                .startLocation(startLocation)
                .sabotageCoolTime(gameSetting.getSabotageCoolTime())
                .build();
    }

    public int incrementAndGetMissionProgress() {
        completedMissionCount++;
        return getMissionProgress();
    }

    public int getMissionProgress() {
        return (int) (completedMissionCount * 100.0 / totalMissionCount);
    }

    public void refreshMissionCount() {
        AtomicInteger total = new AtomicInteger();
        AtomicInteger complete = new AtomicInteger();
        gameCharacters.values().stream().filter(v -> v.getRole() == Role.CITIZEN).forEach(v -> {
            Map<String, ActiveMission> missions = v.getMissions();
            total.addAndGet(missions.size());
            complete.addAndGet(
                    (int) missions.values().stream().filter(ActiveMission::isSolved).count());
        });
        this.totalMissionCount = total.get();
        this.completedMissionCount = complete.get();
        Events.raise(new MissionProgressChangeEvent(roomId,
                getMissionProgress()));           //TODO: change observe missionCount update ?
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

    public void votingStart() {
        voted = new ConcurrentHashMap<>(getSurvivorCount());
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
        log.info("check game end: {}", roomId.toString());
        Role winRole = null;
        if (this.isMafiaWin()) {
            winRole = Role.MAFIA;
        } else if (this.isCitizenWin()) {
            winRole = Role.CITIZEN;
        }

        if (winRole != null) {
            GameEndEvent gameEndEvent = new GameEndEvent(roomId, Role.CITIZEN);
            log.info("  game end event: {}", gameEndEvent);
            Events.raise(gameEndEvent);
        }
    }

    private boolean isMafiaWin() {
        int aliveMafiaCount = getSurvivorCount(Role.MAFIA);
        int aliveCitizenCount = getSurvivorCount(Role.CITIZEN);
        return aliveMafiaCount >= aliveCitizenCount;
    }

    private boolean isCitizenWin() {
        refreshMissionCount();
        int aliveMafiaCount = getSurvivorCount(Role.MAFIA);
        return aliveMafiaCount == 0 || totalMissionCount == completedMissionCount;
    }

    public GameCharacter getGameCharacter(String playerId) {
        return Optional.of(gameCharacters.get(playerId)).orElseThrow(
                GameCharacterNotFoundException::new);
    }

    public void openSabotage(GameMapMission mission) {
        int targetCount = getSurvivorCount();
        BasicSabotageMissionGoal goal = new BasicSabotageMissionGoal(targetCount);
        sabotage.open(SabotageMission.of(mission, goal));
    }

    public Sabotage getSabotage() {
        if (!sabotage.isActive()) {
            throw new SabotageNotActiveException(roomId.toString());
        }
        return this.sabotage;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("GameData{").append("roomId=").append(roomId)
                .append(", totalMissionCount=").append(totalMissionCount)
                .append(", completedMissionCount=").append(completedMissionCount)
                .append(", meetingLimitTime=").append(meetingLimitTime).append(", votingLimitTime=")
                .append(votingLimitTime).append(", voted=").append(voted).append(", inMeeting=")
                .append(inMeeting).append(", sabotage=").append(sabotage)
                .append(", gameCharacters=").append(gameCharacters).append('}').toString();
    }
}
