package com.project.arc205.game.sabotage;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.project.arc205.common.model.Location;
import com.project.arc205.game.dummy.DummyGameCharacter;
import com.project.arc205.game.gamecharacter.exception.AlreadyParticipateException;
import com.project.arc205.game.gamecharacter.exception.DeadCharacterException;
import com.project.arc205.game.gamecharacter.exception.NotParticipateException;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.Sabotage;
import com.project.arc205.game.gamedata.model.exception.SabotageAlreadyOpenException;
import com.project.arc205.game.gamedata.model.exception.SabotageCoolTimeException;
import com.project.arc205.game.mission.model.BasicSabotageMissionGoal;
import com.project.arc205.game.mission.model.SabotageMission;
import com.project.arc205.game.mission.model.entity.GameMapMission;
import com.project.arc205.game.mission.model.entity.Mission;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class SabotageTest {

    Sabotage sabotage;
    int targetCount = 6;


    private SabotageMission getSabotageMission() {
        GameMapMission gameMapMission = new GameMapMission();
        Mission mission = new Mission();
        mission.setId(10L);
        mission.setTitle("sabotage mission");
        gameMapMission.setMission(mission);
        gameMapMission.setLocation(new Location(0.0, 0.0));

        BasicSabotageMissionGoal goal = new BasicSabotageMissionGoal(targetCount);

        return SabotageMission.of(gameMapMission, goal);
    }

    @BeforeEach
    void init() {
        sabotage = new Sabotage(UUID.randomUUID(), 15);
    }

    @Test
    @DisplayName("사보타지 생성")
    void testOpenSabotage() {
        SabotageMission mission = getSabotageMission();

        sabotage.setCoolTime(true);
        assertThrows(SabotageCoolTimeException.class, () ->
                sabotage.open(mission));

        sabotage.setCoolTime(false);
        sabotage.open(mission);
        assertTrue(sabotage.isActive());

        assertThrows(SabotageAlreadyOpenException.class, () ->
                sabotage.open(mission));
    }

    private void openSabotage() {
        SabotageMission mission = getSabotageMission();
        sabotage.open(mission);
    }

    @Test
    @DisplayName("사보타지 미션에 참가 중이지 않은 플레이어는 미션에 참가할 수 있습니다")
    void testJoinSabotage() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        sabotage.join(character);
        assertTrue(sabotage.getParticipants().containsKey(character.getPlayerId()));

        assertThrows(AlreadyParticipateException.class, () -> sabotage.join(character));
    }

    @Test
    @DisplayName("죽은 플레이어는 사보타지 미션에 참가할 수 없습니다")
    void testDeadPlayerCannotJoinSabotage() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        character.die();

        assertThrows(DeadCharacterException.class, () -> sabotage.join(character));
    }

    @Test
    @DisplayName("사보타지 미션에 참가 중인 플레이어는 미션에서 떠날 수 있습니다.")
    void testLeaveSabotage() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        String playerId = character.getPlayerId();
        assertThrows(NotParticipateException.class, () -> sabotage.leave(playerId));

        sabotage.join(character);

        sabotage.leave(playerId);
        assertFalse(sabotage.getParticipants().containsKey(playerId));
    }

    @Test
    @DisplayName("미션에 참가 중이지 않은 플레이어는 미션을 해결할 수 없습니다")
    void testCannotSolveIfNotParticipants() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        String playerId = character.getPlayerId();
        assertThrows(NotParticipateException.class, () -> sabotage.solve(playerId));
    }

    @Test
    @DisplayName("참여자는 미션을 해결할 수 있습니다")
    void testSolveSabotageMission() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        sabotage.join(character);

        sabotage.solve(character.getPlayerId());
        int expected = (int) (1 * 100.0 / targetCount);
        int progress = sabotage.getMission().getProgress();
        assertThat(progress, equalTo(expected));
    }

    @Test
    @DisplayName("목표 만큼 미션을 수행하면 미션이 해결됩니다.")
    void testSolveSabotageMission2() {
        openSabotage();

        GameCharacter character = DummyGameCharacter.getTestCitizen();
        sabotage.join(character);

        for (int i = 1; i <= targetCount; i++) {
            sabotage.solve(character.getPlayerId());
            int expected = (int) (i * 100.0 / targetCount);
            int progress = sabotage.getMission().getProgress();
            assertThat(progress, equalTo(expected));
        }
        assertTrue(sabotage.getMission().isSolved());
    }

}