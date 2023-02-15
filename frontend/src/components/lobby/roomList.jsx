import { Modal, Button, Input } from 'antd';
import { roomListRequest } from 'api';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = `http://${ process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRESS : 'localhost'}:8080/api/v1`
const RoomList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [rooms, setRooms] = useState([])
  let ids = []
  const [isNewRoomOpen, setIsNewMapOpen] = useState(false)
  const fn = () =>{}
  const RoomMake = async (body) => {
    await roomListRequest().then((res) => {
      setRooms(res.data)
      ids = []
      for (let room of res.data) {
        ids.push(room.id)
      }
     })
    await axios.post(`${BASE_URL}/rooms`,body)
    await roomListRequest().then((res)=>{
      if (res.data.length === ids.length) {
        setTimeout(()=>{
        },2000)
      }
    }).then((res) =>{
        // console.log(2)
        roomListRequest().then((res3) =>{
          // console.log(3)
          for(let room of res3.data) {
            // console.log(res3.data)
            if (!(room.id in ids)&&(room.title === title)) {
              navigate(`${room.id}/regist`)
              setRooms(res3.data)
              break;
            }
          }})})
     }

    

  const titleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  
  useEffect(() => {
    roomListRequest().then((res) => {
        // console.log(res.data)
        setRooms(res.data)
    })
  },[])

  const submitHandler = (e) =>{
    e.preventDefault();
    // console.log(title)
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
      <button onClick={()=>{roomListRequest().then((res) => {
        setRooms(res.data)})}}>방목록 새로고침</button>
    <Modal
    title='Room Name 입력'
    open={isNewRoomOpen}
    width={300}
    closable={true}
    footer={[
    ]}>
    <div> 
      <form onSubmit={submitHandler}>
        <div align="center">
        <Input style={{ width: 'calc(100% - 200px)' }} value={title} onChange={titleHandler} defaultChecked/>
        </div>
        <div align="center">
        <Button type='primary'>만들기</Button>
        </div>
      </form>

    </div>
    </Modal>
    </>
    </div>
  );
};

export default RoomList;
