package com.project.arc205.game.mission.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.entity.BaseEntity;
import com.project.arc205.game.gamemap.model.entity.GameMap;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "gamemap_mission", indexes = @Index(name = "idx_gamemap_id", columnList = "gamemap_id"))
public class GameMapMission extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "gamemap_id", nullable = false)
    private GameMap gamemap;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;


    @Embedded
    private Location location;

}
