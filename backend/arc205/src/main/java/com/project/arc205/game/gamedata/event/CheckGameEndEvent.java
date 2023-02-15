package com.project.arc205.game.gamedata.event;

import com.project.arc205.common.event.DomainEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public class CheckGameEndEvent implements DomainEvent {

    String playerId;
}
