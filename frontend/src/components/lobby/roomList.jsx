import { Modal, Input, Collapse, Row, Col, Divider,Button } from 'antd';
import { roomListRequest } from 'api';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegistSimple from 'components/game/regist/registSImple';
import './roomListstyle.css'
import { Avatar, Card } from 'antd';
import {
  CrownOutlined,
  SyncOutlined
} from '@ant-design/icons'

const { Meta } = Card;


const BASE_URL = `${ process.env.REACT_APP_IP_ADDRESS ? process.env.REACT_APP_IP_ADDRESS : 'http://localhost:8080'}/api/v1`
const RoomList = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [rooms, setRooms] = useState([])
  let ids = []
  const [isNewRoomOpen, setIsNewMapOpen] = useState(false)
  const [regist,setRegist] = useState(false)

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
              setRegist(room.id)
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

  useEffect(()=>{
    console.log(regist)
  },[regist])
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
    <div>  
      <>

    <Modal
    title='ROOM TITLE'
    open={isNewRoomOpen}
    width={300}
    onCancel={()=>{setIsNewMapOpen(false)}}
    footer={[
    ]}>
    <div> 

        <div align="center" style={{marginBottom: '5%'}}>
        <Input value={title} onChange={titleHandler} placeholder='Room Title'/>
        </div>
        <div align="center">
        <Button type='primary' ghost onClick={submitHandler}>만들기</Button>
        </div>


    </div>
    </Modal>
    </>
    {/*  */}
    
<div className='div1'>
        <div className="header">
        <h1>Game Rooms</h1>
            <h2>A subtitle for your page goes here</h2>
        </div>


</div>
<div className="content div5">
  <br></br>
<Row gutter={[16, 16]}>
<Col span={6}>
      <Button type="primary" size='large' onClick={()=>{setIsNewMapOpen(true)}} icon={<CrownOutlined />} >NEW GAME</Button>
      </Col>
      <Col span={6}>
      <Button type="primary" size='large' onClick={()=>{roomListRequest().then((res) => {
        setRooms(res.data)
        console.log(rooms)})}} ghost icon={<SyncOutlined />}>REFRESH</Button>
      </Col>
      <Col span={6} order={2}>

      </Col>
      <Col span={6} order={1}>

      </Col>
      </Row>
      <Divider>Room List</Divider>
<Row gutter={[16, 16]}>

    {rooms.map(room => (
      
        <Col span={12} key={room.id}>
      <Card onClick={()=>{
        console.log('a')
        setRegist(room.id)}} key={room.id} hoverable >        
          <Meta title={room.title}
          description={`(${room.amountOfPlayers}/6)`}></Meta>
        </Card>
        <Modal
        title={`ROOM:${room.title}`}
        open={room.id === regist}
        onCancel={()=>{
          setRegist(false)}
        }
        footer
        key={room.id}><RegistSimple roomId={{data:room.id}}/></Modal>
        </Col>
        
      
    ))}
  </Row>
    
    </div>

    </div>
  );
};

export default RoomList;
