package com.project.arc205.game.meeting.event.handler;

import com.project.arc205.common.Constant;
import com.project.arc205.common.dto.BaseResponse;
import com.project.arc205.common.operation.operation.MeetingOperation;
import com.project.arc205.game.gamedata.model.entity.GameData;
import com.project.arc205.game.gamedata.repository.GameRepository;
import com.project.arc205.game.meeting.dto.response.VoteResultResponse;
import com.project.arc205.game.meeting.event.MeetingEvent;
import com.project.arc205.game.meeting.event.VotingEndEvent;
import com.project.arc205.game.meeting.exception.LowSurvivorsException;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@AllArgsConstructor
public class MeetingEventHandler {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final TaskScheduler taskScheduler;
    private final GameRepository gameRepository;
    private Map<String, ScheduledFuture<?>> votingEndSchedules;

    @Async
    @EventListener
    public void meetingStart(MeetingEvent event) {
        GameData curGame = gameRepository.findById(UUID.fromString(event.getRoomId()));
        String destination = Constant.DESTINATION_PREFIX + event.getRoomId();
        log.info("{}: meeting start event", destination);

        long meetingLimitTime = curGame.getMeetingLimitTime() * 1000L;
        long votingLimitTime = curGame.getVotingLimitTime() * 1000L;

        //schedule voting start
        taskScheduler.schedule(() -> {
            log.info("{}: voting start", destination);
            BaseResponse<?> response = BaseResponse.meeting(MeetingOperation.START_VOTING).build();
            simpMessagingTemplate.convertAndSend(destination, response);
            curGame.votingStart();

            //schedule voting end
            ScheduledFuture<?> votingEndSchedule = taskScheduler.schedule(
                    () -> votingEnd(new VotingEndEvent(event.getRoomId())),
                    new Date(System.currentTimeMillis() + votingLimitTime));
            votingEndSchedules.put(event.getRoomId(), votingEndSchedule);

        }, new Date(System.currentTimeMillis() + meetingLimitTime));
    }

    @Async
    @EventListener
    public void votingEnd(VotingEndEvent event) {
        String destination = Constant.DESTINATION_PREFIX + event.getRoomId();
        log.info("{}: voting end", destination);

        //cancel End schedule
        if (votingEndSchedules.containsKey(event.getRoomId())) {
            votingEndSchedules.remove(event.getRoomId()).cancel(true);
        }

        GameData curGame = gameRepository.findById(UUID.fromString(event.getRoomId()));

        //generate voting result
        List<String> survivors = curGame.getSurvivors();
        Map<String, String> ballotBox = curGame.getVoted();
        Map<String, List<String>> voteResults = survivors.stream()
                .collect(Collectors.groupingBy(
                        id -> ballotBox.getOrDefault(id, Constant.VOTED_SKIP_ID)));

        List<Map.Entry<String, List<String>>> sorted = voteResults.entrySet().stream()
                .sorted(Comparator.comparingInt(e -> -e.getValue().size()))
                .limit(2).collect(Collectors.toList());
        String elected = Constant.VOTED_SKIP_ID;
        if (sorted.size() == 0) {
            throw new LowSurvivorsException();
        }
        if (sorted.size() < 2) {
            elected = sorted.get(0).getKey();
        } else if (sorted.get(0).getValue().size() != sorted.get(1).getValue().size()) {
            elected = sorted.get(0).getKey();
        }

        //broadcast voting result
        VoteResultResponse response = VoteResultResponse.of(voteResults, elected);
        simpMessagingTemplate.convertAndSend(destination,
                BaseResponse.meeting(MeetingOperation.END).data(response));
        curGame.votingEnd();
        curGame.meetingEnd();
    }
}
