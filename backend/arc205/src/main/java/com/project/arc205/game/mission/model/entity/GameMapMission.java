package com.project.arc205.game.mission.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.gamemap.model.entity.GameMap;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@Table(name = "gamemap_mission")
@IdClass(GameMapMissionId.class)
public class GameMapMission {

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Mission mission;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private GameMap gamemap;

    @Embedded
    private Location location;

}
