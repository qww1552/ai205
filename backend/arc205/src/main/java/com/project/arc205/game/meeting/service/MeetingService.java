package com.project.arc205.game.meeting.service;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.game.meeting.dto.StartMeetingResponse;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingService {
    private final ApplicationEventPublisher publisher;

    public BaseResponse<StartMeetingResponse> startMeeting(String roomId, SimpMessagingTemplate simpMessagingTemplate) {
        publisher.publishEvent(new MeetingEvent(roomId, simpMessagingTemplate));

        //TODO: Get players from GameData
        //dummy data
        List<StartMeetingResponse.Player> players = new ArrayList<>();
        players.add(new StartMeetingResponse.Player("p1", true));
        players.add(new StartMeetingResponse.Player("p2", false));
        players.add(new StartMeetingResponse.Player("p3", true));
        //end dummy

        return StartMeetingResponse.of(players);
    }

}
