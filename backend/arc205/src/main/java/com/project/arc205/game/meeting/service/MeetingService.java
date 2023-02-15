package com.project.arc205.game.meeting.service;

import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.meeting.dto.response.MeetingStartResponse;
import com.project.arc205.game.meeting.dto.response.VotedResponse;
import com.project.arc205.game.meeting.event.MeetingEvent;
import com.project.arc205.game.meeting.event.VotingEndEvent;
import com.project.arc205.game.meeting.exception.AlreadyInMeetingException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final ApplicationEventPublisher publisher;
    private final GameRepository gameRepository;

    public MeetingStartResponse meetingStart(String roomId) {
        GameData curGame = gameRepository.findById(UUID.fromString(roomId));
        if (!curGame.meetingStart()) {
            throw new AlreadyInMeetingException();
        }
        publisher.publishEvent(new MeetingEvent(roomId));
        return MeetingStartResponse.of(curGame.getGameCharacters());
    }

    public VotedResponse vote(String roomId, String playerId, String target) {
        GameData gameData = gameRepository.findById(UUID.fromString(roomId));
        int remainingVoteTicket = gameData.vote(playerId, target);
        if (remainingVoteTicket == 0) {
            publisher.publishEvent(new VotingEndEvent(roomId));
        }
        return VotedResponse.of(playerId, remainingVoteTicket);
    }

}
