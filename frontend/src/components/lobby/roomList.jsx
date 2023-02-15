import { Modal } from 'antd';
import { roomListRequest } from 'api';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = `http://${ process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRESS : 'localhost:8080'}/api/v1`

const RoomList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [rooms, setRooms] = useState([])
  let ids = []
  const [isNewRoomOpen, setIsNewMapOpen] = useState(false)
  
  const RoomMake = (body) => {
    roomListRequest().then((res) => {
      setRooms(res.data)
      ids = []
      for (let room of res.data) {
        ids.push(room.id)
      }
     })
     .then(res => {axios.post(`${BASE_URL}/rooms`,body)
     console.log('요청완료')})
     .then(res =>{
       setIsNewMapOpen(false) 
     })
     .then(res =>{
       roomListRequest().then((res) => {
         for(let room of res.data) {
           if (!(room.id in ids)&&(room.title === title)) {
             navigate(`${room.id}/regist`)
             setRooms(res.data)
             break;
             
           }
         }
       })
     }
 
     )
    
  }

  const titleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  
  useEffect(() => {
    roomListRequest().then((res) => {
        setRooms(res.data)
    })
  },[])

  const submitHandler = (e) =>{
    e.preventDefault();
    console.log(title)
    let body = {
      title: title
    };
    RoomMake(body)
  }
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
      <>
      <button onClick={()=>{setIsNewMapOpen(true)}}>새방만들기</button>
    <Modal
    open={isNewRoomOpen}
    width={1920}
    closable={false}
    footer={[
    ]}>
    <div> 
      <form onSubmit={submitHandler}>
        <label>방이름</label>
        <input type="text" value={title} onChange={titleHandler}/>
        <button>만들기</button>
      </form>
      
    </div>
    </Modal>
    </>
    </div>
  );
};

export default RoomList;
