package com.project.arc205.game.mission.model.repository;

import com.project.arc205.game.gamemap.model.entity.GameMap;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameMapMissionRepository extends JpaRepository<GameMapMission, Long> {

    List<GameMapMission> findByGamemap(GameMap gameMap);
}
