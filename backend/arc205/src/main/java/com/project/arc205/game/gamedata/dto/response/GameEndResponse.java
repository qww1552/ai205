package com.project.arc205.game.gamedata.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.arc205.common.model.Role;
import com.project.arc205.game.gamecharacter.model.entity.GameCharacter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
public class GameEndResponse {

    @JsonProperty("win")
    private final Role winRole;
    private final List<Player> players;

    public static GameEndResponse of(Role winRole, Map<String, GameCharacter> gameCharacters) {
        ArrayList<Player> players = new ArrayList<>(gameCharacters.size());
        gameCharacters.forEach((playerId, character) -> players.add(
                new GameEndResponse.Player(playerId, character))
        );
        return new GameEndResponse(winRole, players);
    }

    @Getter
    private static class Player {

        private final String id;
        private final boolean alive;
        private final Role role;

        private Player(String id, GameCharacter character) {
            this.id = id;
            this.alive = character.getIsAlive();
            this.role = character.getRole();
        }
    }

}
