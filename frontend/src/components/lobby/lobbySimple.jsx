import { notification } from 'antd';
import { Modal, Input, Collapse, Row, Col, Divider,Button,Card } from 'antd';
import { roomRequest } from 'api';
import { selectGameInfo } from 'app/gameInfo';
import { selectMe } from 'app/me';
import { action } from 'app/store';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import {
  PlusCircleFilled,
  MinusCircleFilled,
  HomeOutlined,
  ExportOutlined
} from '@ant-design/icons';
import './roomListstyle.css'
const { Meta } = Card;
let dummyData = {}

const LobbySimple = () => {
  const [otherPlayers, setotherPlayers] = useState([])
  
  const roomId = useRouteLoaderData("lobby");
  const openNotification = (player) => {
    // console.log(player)
    notification.open({
      message: `${player.id}님이 입장했습니다`,
      description:`${otherPlayers.length}명이 대기중`,
      duration: 2,
      icon: <PlusCircleFilled style={{ color: '#108ee9' }} />,
      onClick: () => {
        // console.log('Notification Clicked!');
      },
    });
  };
  const opendelNotification = (player) => {
    // console.log(player)
    notification.open({
      message: `${player}님이 퇴장했습니다`,
      description:`${otherPlayers.length}명이 대기중`,
      duration: 2,
      icon: <MinusCircleFilled style={{ color: '#ed2131' }} />,
      onClick: () => {
        // console.log('Notification Clicked!');
      },
    });
  }


  
  const me = useSelector(selectMe);
  const navigate = useNavigate();
  let isInGame = useSelector(selectGameInfo).isInGame;

  useEffect(()=> {

      setplayerInfo()
      action('SOCKET_CONNECT_REQUEST', {roomId})
      action("videoInfo/setMySessionId", roomId)

  },[])

  useEffect(() => {
    
    document.title = `Waiting Room - ${otherPlayers.length} otherPlayers`;
    if (otherPlayers.length>=1) {
      let newDummy = {}
      for (let player of otherPlayers) {
        if (!(player.id in dummyData)) {
          openNotification(player)
          newDummy[player.id] = true
        } else {
          delete dummyData[player.id]
          newDummy[player.id] = true
        }
      }
      for (let player of Object.keys(dummyData)) {
        opendelNotification(player)
      }
      dummyData = {...newDummy}
    }
  }, [otherPlayers.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setplayerInfo();
    }, 2000)
    return () => {clearInterval(timer)
      dummyData = {}};
  },[]);

  const setplayerInfo = async() => {
    roomRequest(roomId).then(res =>  {
      const players = res.data.data.players
      const otherPlayers = players.filter(v => v.id !== me.player.id)
      setotherPlayers(otherPlayers);
    }).catch((e) => {
      setotherPlayers([]);
    });
  }

  useEffect(() => {
    if(isInGame) {
      navigate(`/rooms/${roomId}/game`)
    }
  },[isInGame])

  const gameStartBtn = () => {
    action('GAME_START_REQUEST');
  }

  return (
    <div className="waiting-room div1">
        <div className="header">
        <h1>Waiting Room</h1>
      {/* <h2>4명 이상의 플레이어</h2> */}
    </div>
      
      {/* <h2>Me</h2>
        {me.player.id}
      <h2>OtherPlayers</h2>
      <ul>
        {otherPlayers.map((player, i) => (
          <li key={`${player.id}${i}`}>{player.id}</li>
        ))}
      </ul>
      {otherPlayers.length >= 3 && (
        <button onClick={gameStartBtn}>Start Game</button>
        // <Link to={`/rooms/${roomId}/game`}><button>Start Game</button></Link>
      )} */}
      <div className="content div5">
<br></br>
<Row gutter={[16, 16]}>
<Col span={6}>
<Button type="primary" size='large' ghost icon={<HomeOutlined/>}><a href="/">HOME</a></Button>
</Col>
<Col span={6}>
<Button danger size='large' ghost icon={<ExportOutlined />}><a href='/rooms'>EXIT</a></Button>
</Col>
<Col span={6} order={2}>

</Col>
<Col span={6} order={1}>

</Col>
</Row>
<Divider>PLAYER</Divider>
<Row gutter={[16, 16]}>
<Col span={8} key={me.player.id}>
<Card key={me.player.id} hoverable >        
    <Meta title={me.player.id}
></Meta>
  </Card>
  </Col>{otherPlayers?otherPlayers.map((player, i) => (

<Col span={8} key={player.id}>
<Card key={player.id} hoverable >        
  <Meta title={player.id}></Meta>
</Card>
</Col>


)):''}

</Row>
{otherPlayers.length >= 3 && (
        <Button onClick={gameStartBtn} type="primary" ghost>Start Game</Button>
        // <Link to={`/rooms/${roomId}/game`}><button>Start Game</button></Link>
      )} 
</div>
    </div>
  );
};

export default LobbySimple;




