package com.project.arc205.meeting.service;

import com.project.arc205.meeting.dto.StartMeetingResponse;
import com.project.arc205.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeetingService {
    private final ApplicationEventPublisher publisher;

    public StartMeetingResponse startMeeting(String roomId, SimpMessagingTemplate simpMessagingTemplate) {
        publisher.publishEvent(new MeetingEvent(roomId, simpMessagingTemplate));

        return new StartMeetingResponse();
    }

}
