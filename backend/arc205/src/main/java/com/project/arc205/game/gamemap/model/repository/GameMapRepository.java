package com.project.arc205.game.gamemap.model.repository;

import com.project.arc205.game.gamemap.model.entity.GameMap;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameMapRepository extends JpaRepository<GameMap, Long> {

    @Override
    Optional<GameMap> findById(Long aLong);
}
