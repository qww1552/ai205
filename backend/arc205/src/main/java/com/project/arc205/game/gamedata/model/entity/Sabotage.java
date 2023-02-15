package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.event.Events;
import com.project.arc205.game.gamecharacter.exception.AlreadyParticipateException;
import com.project.arc205.game.gamecharacter.exception.DeadCharacterException;
import com.project.arc205.game.gamecharacter.exception.NotParticipateException;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.event.SabotageCloseEvent;
import com.project.arc205.game.gamedata.event.SabotageOpenEvent;
import com.project.arc205.game.gamedata.model.exception.SabotageAlreadyOpenException;
import com.project.arc205.game.gamedata.model.exception.SabotageCoolTimeException;
import com.project.arc205.game.mission.model.SabotageMission;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Sabotage {

    private UUID roomId;
    private boolean active;
    private boolean isCoolTime;
    private int coolTime;
    private Map<String, String> participants;
    private SabotageMission mission;

    public Sabotage(UUID roomId, int coolTime) {
        this.roomId = roomId;
        this.coolTime = coolTime;
        this.active = false;
        this.isCoolTime = false;
        this.participants = new ConcurrentHashMap<>();
    }

    public void open(SabotageMission mission) {
        if (this.isCoolTime) {
            throw new SabotageCoolTimeException(roomId.toString());
        }
        if (this.active) {
            throw new SabotageAlreadyOpenException(roomId.toString());
        }
        this.active = true;
        this.participants = new ConcurrentHashMap<>();
        this.mission = mission;
        Events.raise(new SabotageOpenEvent(roomId));
    }

    public void close() {
        this.active = false;
        this.isCoolTime = true;
        Events.raise(new SabotageCloseEvent(roomId));
    }

    public void join(GameCharacter character) {
        String playerId = character.getPlayerId();
        if (!character.getIsAlive()) {
            throw new DeadCharacterException(playerId);
        }
        if (participants.containsKey(playerId)) {
            throw new AlreadyParticipateException(playerId);
        }
        participants.put(playerId, playerId);
    }

    public void leave(String playerId) {
        if (!participants.containsKey(playerId)) {
            throw new NotParticipateException(playerId);
        }
        participants.remove(playerId);
    }

    public void solve(String playerId) {
        //TODO: 프론트 요청으로 예외처리 패스
//        if (!participants.containsKey(playerId)) {
//            throw new NotParticipateException(playerId);
//        }
        //TODO: 미션 수행 response 이벤트로 처리, 미션 완료보다 먼저 가기 위해..
        if (mission.solve()) {
            this.close();
        }
    }
}
