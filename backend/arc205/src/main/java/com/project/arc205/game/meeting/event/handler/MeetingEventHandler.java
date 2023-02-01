package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.Constant;
import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.Type;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.gamedata.model.entity.DummyGame;
import com.project.arc205.game.meeting.dto.response.VoteResultResponse;
import com.project.arc205.game.meeting.event.VotingEndEvent;
import com.project.arc205.game.meeting.event.MeetingEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;


@Slf4j
@Component
@AllArgsConstructor
public class MeetingEventHandler {
    private final DummyGame curGame;  //TODO: change game repo
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final TaskScheduler taskScheduler;
    private final String destPrefix = "/sub/room/";

    private Map<String, ScheduledFuture<?>> votingEndSchedules;

    @Async
    @EventListener
    public void meetingStart(MeetingEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: meeting start event", destination);
        //TODO: Get from game setting
        long meetingLimitTime = 10 * 1000;
        long votingLimitTime = 20 * 1000;

        //schedule voting start
        taskScheduler.schedule(() -> {
            log.info("{}: voting start", destination);
            BaseResponse<?> response = BaseResponse.of(Type.MEETING, MeetingOperation.START_VOTING);
            simpMessagingTemplate.convertAndSend(destination, response);
            curGame.getGameData().startVote();

            //schedule voting end
            ScheduledFuture<?> votingEndSchedule = taskScheduler.schedule(() -> votingEnd(new VotingEndEvent(event.getRoomId())), new Date(System.currentTimeMillis() + votingLimitTime));
            votingEndSchedules.put(event.getRoomId(), votingEndSchedule);

        }, new Date(System.currentTimeMillis() + meetingLimitTime));
    }

    @Async
    @EventListener
    public void votingEnd(VotingEndEvent event) {
        String destination = destPrefix + event.getRoomId();
        log.info("{}: voting end", destination);

        //cancel End schedule
        if (votingEndSchedules.containsKey(event.getRoomId())) {
            votingEndSchedules.remove(event.getRoomId()).cancel(true);
        }

        //generate voting result
        List<String> survivors = curGame.getGameData().getSurvivors();
        Map<String, String> ballotBox = curGame.getGameData().getVoted();
        Map<String, List<String>> voteResults = survivors.stream()
                    .collect(Collectors.groupingBy(id -> ballotBox.getOrDefault(id, Constant.VOTED_SKIP_ID)));

        List<Map.Entry<String, List<String>>> sorted = voteResults.entrySet().stream()
                .sorted(Comparator.comparingInt(e -> -e.getValue().size()))
                .limit(2).collect(Collectors.toList());
        String elected = Constant.VOTED_SKIP_ID;
        if (sorted.size() < 2)
            elected = sorted.get(0).getKey();
        else if (sorted.get(0).getValue().size() != sorted.get(1).getValue().size())
            elected = sorted.get(0).getKey();

        //broadcast voting result
        BaseResponse<VoteResultResponse> response = VoteResultResponse.newBaseResponse(voteResults, elected);
        simpMessagingTemplate.convertAndSend(destination, response);
        curGame.getGameData().endVote();
    }
}
