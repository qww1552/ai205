package com.project.arc205.game.room.controller;

import com.project.arc205.common.dto.BaseRestResponse;
import com.project.arc205.game.room.dto.request.RoomCreateRequest;
import com.project.arc205.game.room.dto.response.RoomCreateResponse;
import com.project.arc205.game.room.dto.response.RoomListItemResponse;
import com.project.arc205.game.room.dto.response.RoomResponse;
import com.project.arc205.game.room.service.RoomService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/rooms")
@RestController
// TODO : 나중에 fitle
@CrossOrigin("*")
public class RoomRestController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomListItemResponse>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @GetMapping("/{room-id}")
    public BaseRestResponse<RoomResponse> findById(@PathVariable("room-id") String roomId) {
        return BaseRestResponse.of(roomService.findRoomById(roomId));
    }

    @PostMapping
    public ResponseEntity<URI> create(@RequestBody RoomCreateRequest roomCreateRequest) {
        log.info("room create request : {}", roomCreateRequest);
        RoomCreateResponse response = roomService.create(roomCreateRequest.getTitle());
        return ResponseEntity.created(URI.create("/rooms/" + response.getId())).build();
    }
}
