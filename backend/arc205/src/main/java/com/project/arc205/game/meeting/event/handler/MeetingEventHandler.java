package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.common.util.Scheduler;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingEventHandler {
    private final String destPrefix = "/sub/room/";
    @EventListener
    public void startMeeting(MeetingEvent event) {
        log.info("Start startMeeting Event");
        String destination = destPrefix + event.getRoomId();
        Scheduler scheduler = new Scheduler();
        Runnable runnable = () -> {
            BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.START_VOTING);
            event.getMessagingTemplate().convertAndSend(destination, response);
            log.info("Send StartVoting");
        };
        long delay = 60;      //TODO: Get from game setting
        scheduler.execute(runnable, delay);
    }
}
