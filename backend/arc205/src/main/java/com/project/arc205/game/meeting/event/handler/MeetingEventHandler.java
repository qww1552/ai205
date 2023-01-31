package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.gamedata.model.entity.DummyGame;
import com.project.arc205.game.meeting.event.VotingEndEvent;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingEventHandler {
    private final DummyGame curGame;  //TODO: change game repo
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final String destPrefix = "/sub/room/";

    @Async
    @EventListener
    public void meetingStart(MeetingEvent event) throws InterruptedException {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: start meeting event", destination);
        //TODO: Get from game setting
        long meetingLimitTime = 10 * 1000;
        long votingLimitTime = 20 * 1000;

        //wait voting start
        Thread.sleep(meetingLimitTime);

        log.info("{}: StartVoting", destination);
        BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.START_VOTING);
        simpMessagingTemplate.convertAndSend(destination, response);
        curGame.getGameData().startVote();

        //wait voting end
        Thread.sleep(votingLimitTime);

        if (curGame.getGameData().isVotingPeriod()) {
            votingEnd(new VotingEndEvent(event.getRoomId()));
        }
    }

    @Async
    @EventListener
    public void votingEnd(VotingEndEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: EndVoting", destination);
        //TODO: 투표 결과 집계
        BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.END);
        simpMessagingTemplate.convertAndSend(destination, response);
        curGame.getGameData().endVote();
    }
}
