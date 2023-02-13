package com.project.arc205.game.manager;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

import com.project.arc205.game.dummy.DummyRoom;
import com.project.arc205.game.gamedata.manager.GameManager;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.strategy.BasicColorAssignStrategy;
import com.project.arc205.game.gamedata.strategy.BasicMissionDistributionStrategy;
import com.project.arc205.game.gamedata.strategy.BasicRoleAssignStrategy;
import com.project.arc205.game.gamemap.model.repository.GameMapRepository;
import com.project.arc205.game.mission.model.repository.GameMapMissionRepository;
import com.project.arc205.game.room.model.entity.Room;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class GameManagerTest {

    @Autowired
    private GameMapMissionRepository gameMapMissionRepository;
    @Autowired
    private GameMapRepository gameMapRepository;

    @Test
    @DisplayName("게임데이터 생성시, 미션 분배")
    void missionDistributionTest() {
        int numberOfPlayers = 6;
        Room room = DummyRoom.createTestRoom("testRoom", numberOfPlayers);
        GameManager gameManager = new GameManager(new BasicRoleAssignStrategy(),
                new BasicMissionDistributionStrategy(),
                new BasicColorAssignStrategy(),
                gameMapMissionRepository, gameMapRepository);
        GameData gameData = gameManager.createGameDataFrom(room);

        int citizenMissionCount = (numberOfPlayers - room.getGameSetting().getNumberOfMafias())
                * room.getGameSetting().getNumberOfMissions();
        assertThat(citizenMissionCount, equalTo(gameData.getTotalMissionCount()));

        int expectMissionCount = numberOfPlayers * room.getGameSetting().getNumberOfMissions();
        int missionCount = gameData.getGameCharacters().values().stream()
                .mapToInt(x -> x.getMissions().values().size())
                .sum();
        assertThat(missionCount, equalTo(expectMissionCount));
    }

}
