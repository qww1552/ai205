package com.project.arc205.meeting.event.handler;

import com.project.arc205.meeting.Scheduler;
import com.project.arc205.meeting.dto.StartVotingResponse;
import com.project.arc205.meeting.event.MeetingEvent;
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
            event.getMessagingTemplate().convertAndSend(destination, new StartVotingResponse());
            log.info("Send StartVoting");
        };
        long delay = 60;      //TODO: Get from game setting
        scheduler.execute(runnable, delay);
    }
}
