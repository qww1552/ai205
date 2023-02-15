package com.project.arc205.game.gamedata.model.entity;

import com.project.arc205.common.event.Events;
import com.project.arc205.game.gamedata.event.SabotageCloseEvent;
import com.project.arc205.game.gamedata.event.SabotageOpenEvent;
import com.project.arc205.game.gamedata.model.exception.SabotageAlreadyOpenException;
import com.project.arc205.game.gamedata.model.exception.SabotageCoolTimeException;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
public class Sabotage {

    private UUID roomId;
    private boolean active;
    private boolean isCoolTime;
    private int coolTime;

    public Sabotage(UUID roomId, int coolTime) {
        this.roomId = roomId;
        this.coolTime = coolTime;
        this.active = false;
        this.isCoolTime = false;
    }

    public void open() {
        if (this.isCoolTime) {
            throw new SabotageCoolTimeException(roomId.toString());
        }
        if (this.active) {
            throw new SabotageAlreadyOpenException(roomId.toString());
        }
        this.active = true;
        log.info("sabotage.open() is called");
        Events.raise(new SabotageOpenEvent(roomId));
    }

    public void close() {
        this.active = false;
        this.isCoolTime = true;
        Events.raise(new SabotageCloseEvent(roomId));
    }

}
