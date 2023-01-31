package com.project.arc205.game.room.controller;

import com.project.arc205.common.dto.BaseRestResponse;
import com.project.arc205.game.room.dto.response.RoomResponse;
import com.project.arc205.game.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Slf4j
@Controller
public class RoomMessageController {

    private final RoomService roomService;

    @MessageMapping("/room/{room-id}")
    @SendTo("/sub/room/{room-id}")
    public BaseRestResponse<RoomResponse> findById(@DestinationVariable("room-id") String roomId) {
        return BaseRestResponse.of(roomService.findRoomById(roomId));
    }

}
