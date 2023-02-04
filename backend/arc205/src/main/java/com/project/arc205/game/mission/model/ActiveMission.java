package com.project.arc205.game.mission.model;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.mission.model.entity.Mission;
import lombok.Getter;

/**
 * GameCharacter가 가지게 될 미션 시작 좌표와 해결 여부를 가짐 상속을 고려하여 일단 추상 클래스로 구현하였으니 필요에 따라 변경 바람
 */
@Getter
public abstract class ActiveMission extends Mission {

    protected boolean solved;

    protected Location location;

    public abstract boolean solve();
}
