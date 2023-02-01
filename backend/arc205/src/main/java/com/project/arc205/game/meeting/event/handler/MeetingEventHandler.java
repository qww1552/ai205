package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.gamedata.model.entity.DummyGame;
import com.project.arc205.game.meeting.event.VotingEndEvent;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;


@Slf4j
@Component
@AllArgsConstructor
public class MeetingEventHandler {
    private final DummyGame curGame;  //TODO: change game repo
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final TaskScheduler taskScheduler;
    private final String destPrefix = "/sub/room/";

    private Map<String, ScheduledFuture<?>> endSchedules;

    @Async
    @EventListener
    public void meetingStart(MeetingEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: start meeting event", destination);
        //TODO: Get from game setting
        long meetingLimitTime = 10 * 1000;
        long votingLimitTime = 20 * 1000;

        //schedule voting start
        taskScheduler.schedule(() -> {
            log.info("{}: StartVoting", destination);
            BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.START_VOTING);
            simpMessagingTemplate.convertAndSend(destination, response);
            curGame.getGameData().startVote();

            //schedule voting end
            ScheduledFuture<?> endSchedule = taskScheduler.schedule(() -> votingEnd(new VotingEndEvent(event.getRoomId())), new Date(System.currentTimeMillis() + votingLimitTime));
            endSchedules.put(event.getRoomId(), endSchedule);

        }, new Date(System.currentTimeMillis() + meetingLimitTime));
    }

    @Async
    @EventListener
    public void votingEnd(VotingEndEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: EndVoting", destination);

        //cancel End schedule
        if (endSchedules.containsKey(event.getRoomId())) {
            endSchedules.remove(event.getRoomId()).cancel(true);
        }

        //broadcast voting result
        //TODO: 투표 결과 집계
        BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.END);
        simpMessagingTemplate.convertAndSend(destination, response);
        curGame.getGameData().endVote();
    }
}
