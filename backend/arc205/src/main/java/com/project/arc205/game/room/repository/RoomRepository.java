package com.project.arc205.game.room.repository;

import com.project.arc205.game.gamecharacter.model.entity.Player;
import com.project.arc205.game.room.model.entity.Room;
import com.project.arc205.game.room.model.exception.RoomNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RoomRepository {

    private final ConcurrentHashMap<UUID, Room> roomStorage = new ConcurrentHashMap<>();

    public Room create(String title, Player master) {
        Room room = Room.create(title, master);
        roomStorage.put(room.getId(), room);
        return room;
    }

    public Room findById(UUID id) {
        if (!roomStorage.contains(id)) throw new RoomNotFoundException();
        return roomStorage.get(id);
    }

    public List<Room> findAll() {
        return new ArrayList<>(roomStorage.values());
    }

}