import { roomListRequest } from 'api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const RoomList = () => {


  const [rooms, setRooms] = useState([])


  useEffect(() => {
    roomListRequest().then((res) => {
        setRooms(res.data)
    })
  },[])

  // const rooms = [{id: "0c827963-6661-5511-92f9-dd7d375b968d", name : "first"}, {id: "aa", name : "second"}];

  return (
    <div className="game-rooms">
      <h1>Game Rooms</h1>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <Link to={`${room.id}/regist`}>{room.title}</Link> - {room.amountOfPlayers}명 접속중
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
