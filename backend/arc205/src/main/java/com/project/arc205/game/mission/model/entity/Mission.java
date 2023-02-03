package com.project.arc205.game.mission.model.entity;

import com.project.arc205.common.model.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * Map 에서 GameData로 로딩될 Mission 객체 필요한 내용이 있다면 추가 바람
 */
@Getter
@Setter
@Entity
@Table(name = "mission")
public class Mission extends BaseEntity {

    @Column(nullable = false)
    private String title;

}
