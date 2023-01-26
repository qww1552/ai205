package com.project.arc205.game.meeting.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Getter
@RequiredArgsConstructor
public class MeetingEvent {
    private final String roomId;
    private final SimpMessagingTemplate messagingTemplate;
}
