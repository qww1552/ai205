package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.common.util.Scheduler;
import com.project.arc205.game.gamedata.model.entity.DummyGame;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingEventHandler {
    private final DummyGame curGame;  //TODO: change game repo
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final String destPrefix = "/sub/room/";
    @EventListener
    public void startMeeting(MeetingEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: start meeting event", destination);
        //TODO: Get from game setting
        long meetingLimitTime = 10;
        long votingLimitTime = 20;

        Scheduler scheduler = new Scheduler();

        Runnable runnableEndVoting = () -> {
            log.info("{}: EndVoting", destination);
            BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.END);
            simpMessagingTemplate.convertAndSend(destination, response);
            curGame.getGameData().endVote();
        };

        Runnable runnableStartVoting = () -> {
            log.info("{}: StartVoting", destination);
            BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.START_VOTING);
            simpMessagingTemplate.convertAndSend(destination, response);
            curGame.getGameData().startVote();

            scheduler.execute(runnableEndVoting, votingLimitTime);
        };

        scheduler.execute(runnableStartVoting, meetingLimitTime);
    }
}
