package com.project.arc205.meeting.controller;

import com.project.arc205.meeting.dto.StartMeetingResponse;
import com.project.arc205.meeting.service.MeetingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MeetingController {

    private final MeetingService meetingService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/room/{room-id}/meeting")
    @SendTo("/sub/room/{room-id}")
    public StartMeetingResponse startMeeting(@DestinationVariable("room-id") String roomId) {
        log.info("StartMeeting: {}", roomId);
        return meetingService.startMeeting(roomId, simpMessagingTemplate);
    }

}
