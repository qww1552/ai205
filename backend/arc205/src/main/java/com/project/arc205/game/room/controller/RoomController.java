package com.project.arc205.game.room.controller;

import com.project.arc205.game.room.dto.response.RoomListItemResponse;
import com.project.arc205.game.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/rooms")
@RestController
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomListItemResponse>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }

}
