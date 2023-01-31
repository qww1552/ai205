package com.project.arc205.game.meeting.service;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.game.gamedata.model.entity.DummyGame;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.meeting.dto.request.VoteRequest;
import com.project.arc205.game.meeting.dto.response.StartMeetingResponse;
import com.project.arc205.game.meeting.dto.response.VotedResponse;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingService {
    private final ApplicationEventPublisher publisher;
    private final DummyGame curGame;  //TODO: change game repo

    public BaseResponse<StartMeetingResponse> startMeeting(String roomId) {
        publisher.publishEvent(new MeetingEvent(roomId));

        //TODO: Get curGame from GameData
        List<StartMeetingResponse.Player> players = new ArrayList<>();
        curGame.getGameData().getGameCharacters().forEach((id, gameCharacter) ->
            players.add(StartMeetingResponse.Player.of(id, gameCharacter.getIsAlive()))
        );

        return StartMeetingResponse.of(players);
    }

    public BaseResponse<VotedResponse> vote(VoteRequest voteRequest) {
        GameData gameData = curGame.getGameData();          //TODO
        int remainingVoteTicket = gameData.vote(voteRequest.getFrom(), voteRequest.getTo());
        return VotedResponse.of(voteRequest.getFrom(), remainingVoteTicket);
    }

}
