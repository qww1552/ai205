package com.project.arc205.game.gamemap.model.entity;

import com.project.arc205.common.model.Location;
import com.project.arc205.common.model.entity.BaseEntity;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "gamemap")
public class GameMap extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String title;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "start_location_x", nullable = false)),
            @AttributeOverride(name = "y", column = @Column(name = "start_location_y", nullable = false))
    })
    private Location startLocation;
}
