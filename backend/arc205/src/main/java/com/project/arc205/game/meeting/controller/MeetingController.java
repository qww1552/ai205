package com.project.arc205.game.meeting.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.game.meeting.dto.request.VoteRequest;
import com.project.arc205.game.meeting.dto.response.MeetingStartResponse;
import com.project.arc205.game.meeting.dto.response.VotedResponse;
import com.project.arc205.game.meeting.service.MeetingService;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
@MessageMapping("/room/{room-id}/meeting")
public class MeetingController {

    private final MeetingService meetingService;

    @MessageMapping("/start")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<MeetingStartResponse> startMeeting(
            @DestinationVariable("room-id") String roomId) {
        log.info("/room/{}/meeting/start", roomId);
        return meetingService.meetingStart(roomId);
    }

    @MessageMapping("/vote")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<VotedResponse> voting(@DestinationVariable("room-id") String roomId,
            @NotNull VoteRequest voteRequest) {
        log.info("/room/{}/meeting/vote: {} voted for {}", roomId, voteRequest.getFrom(),
                voteRequest.getTo());
        return meetingService.vote(roomId, voteRequest);
    }

}
