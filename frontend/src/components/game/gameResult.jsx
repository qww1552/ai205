import { Row, Button, Modal, Col } from 'antd';
import { selectGameInfo } from 'app/gameInfo';
import { selectGameResult } from 'app/gameResult';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TypingText from './meeting/TypingText';



const GameResult = () => {
  const isInGame = useSelector(selectGameInfo).isInGame
  const gameResult = useSelector(selectGameResult).gameResult
  const navigate = useNavigate();
  const [Text, setText] = useState("")



  // ※렌더링 되고 10초 지난후 라우터 이동
  useEffect(()=>{
    
    if (!isInGame&&gameResult) {
    // console.log('결과창내놔')
    // console.log(gameResult)
    setText(`${gameResult.win}가 이겼습니다`)
    // setTimeout(() => {
    //   navigate('/rooms')
    //   // Todo:
    //   // 웹소켓 연결 끊기...? 자동으로 되는건지 잘모르겠다
    //   // 게임에 사용된 변수 초기화
    //   // 웹캠컴포넌트랑 채팅창 띄울까 고민중
      
    // },10000)
  }
  },[isInGame, gameResult])
  return (
    <>
    <Modal
    open={!isInGame&&gameResult}
    width={1920}
    closable={false}
    footer={[
    ]}>

    <div>
      <TypingText text={Text} speed={60} fontSize="1.25rem" color="green" />
      {/* {gameResult.players.map((player) => {
        <div>{player.id}:{player.role}</div>
      })} */}
      <Row justify="center">
      <Link to={`/rooms`}><Button type="primary">메인화면으로 돌아가기</Button></Link>
      </Row>     
      
    </div>
    </Modal>
    </>
  );
};

export default GameResult;