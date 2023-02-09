package com.project.arc205.game.gamedata.dto.response;

import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import com.project.arc205.game.gamedata.model.entity.GameSetting;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GameStartResponse {

    private GameSettingDto gameSetting;
    private List<PlayerDto> players;

    public static GameStartResponse of(GameSetting setting, Map<String, GameCharacter> characters) {
        GameSettingDto gameSettingDto = GameSettingDto.of(setting);
        List<PlayerDto> playerDtos = new ArrayList<>(characters.size());
        characters.forEach((k, v) -> playerDtos.add(PlayerDto.of(v)));
        return new GameStartResponse(gameSettingDto, playerDtos);
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class PlayerDto {

        private String id;
        private int color;

        private static PlayerDto of(GameCharacter character) {
            return new PlayerDto(character.getPlayerId(), character.getColor());
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class GameSettingDto {

        private Double visionRange;
        private Double playerSpeed;
        private Integer meetingLimitTime;
        private Integer voteLimitTime;
        private Integer killCoolTime;
        private Integer meetingCoolTime;
        
        public static GameSettingDto of(GameSetting gameSetting) {
            return new GameSettingDto(gameSetting.getVisionRange(),
                    gameSetting.getPlayerSpeed(),
                    gameSetting.getMeetingLimitTime(),
                    gameSetting.getVoteLimitTime(), gameSetting.getKillCoolTime(),
                    gameSetting.getMeetingCoolTime());
        }
    }

}
