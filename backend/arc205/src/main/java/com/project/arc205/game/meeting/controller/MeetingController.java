package com.project.arc205.game.meeting.controller;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.meeting.dto.request.VoteRequest;
import com.project.arc205.game.meeting.dto.response.MeetingStartResponse;
import com.project.arc205.game.meeting.dto.response.VotedResponse;
import com.project.arc205.game.meeting.service.MeetingService;
import com.sun.istack.NotNull;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
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
        return BaseResponse.meeting(MeetingOperation.START)
                .data(meetingService.meetingStart(roomId));
    }

    @MessageMapping("/vote")
    @SendTo("/sub/room/{room-id}")
    public BaseResponse<VotedResponse> vote(@DestinationVariable("room-id") String roomId,
            StompHeaderAccessor accessor, @NotNull VoteRequest voteRequest) {
        String playerId = Objects.requireNonNull(accessor.getUser()).getName();
        log.info("/room/{}/meeting/vote: {} voted for {}", roomId, playerId,
                voteRequest.getTo());
        voteRequest.setFrom(playerId);
        return BaseResponse.meeting(MeetingOperation.VOTE)
                .data(meetingService.vote(roomId, playerId, voteRequest.getTo()));
    }

}
