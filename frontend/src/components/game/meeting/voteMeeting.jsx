import ChatComponent from 'components/webchat/ChatComponent'
import { selectGameset } from 'app/gameSet';
import { selectResult } from 'app/result';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import { action } from "app/store"
import TimerMeeting from './timerMeeting';
import WebchatMeeting from './webchatMeeting';
import { selectGameInfo } from '../../../app/gameInfo';
import { useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Progress, Badge } from "antd"
import {
  MessageTwoTone, 
} from '@ant-design/icons';

import VoteResultFrom from './voteResultFrom';
const VoteMeeting = () => {
  const result = useSelector(selectResult).result
  // const time = useSelector(selectGameset).time
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const time = 100
  const [restTime, setRestTime] = useState(time)
  const unReadMessage = useSelector(selectGameInfo).unReadMessage
  useEffect(()=>{
    return () =>{
    }
  },[])
  const getRestTime = (retime) => {
    setRestTime(retime)
  }

  return (

    <div>
      <div id="usercontent">
      </div>
      <Row gutter={[8,8]} justify="space-between">
      {isInMeeting === true ? <TimerMeeting sec={time} getRestTime={getRestTime}/>:<div>아직회의시간이 아님</div>}
      <Col span={2}>  
          <Button block id="chatBtnIcon" onClick={() => action('gameInfo/setChatModalOpen', true)}>
            <Badge count={unReadMessage}>
            <MessageTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
            </Badge>
          </Button>
        </Col>
      </Row>
      <Row >


        <Col span={2}>  

        </Col>
      </Row>
      {/* <ChatComponent/> */}
      <WebchatMeeting/>

    </div>
  );
};

export default VoteMeeting;