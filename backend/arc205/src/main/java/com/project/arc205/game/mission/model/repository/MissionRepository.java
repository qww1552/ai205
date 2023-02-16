package com.project.arc205.game.mission.model.repository;

import com.project.arc205.game.mission.model.entity.Mission;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    Optional<Mission> findById(String id);
}
