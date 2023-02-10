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
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';

const VoteMeeting = () => {
  const result = useSelector(selectResult).result
  // const time = useSelector(selectGameset).time
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const time = 100
  const [restTime, setRestTime] = useState(time)
  useEffect(()=>{
    console.log("a",isInMeeting)
    console.log("b",isInVote)
    console.log("c",isInVoteResult)
    return () =>{
      console.log('사라짐')
    }
  },[])
  const getRestTime = (retime) => {
    setRestTime(retime)
  }
  // const [VoteduserInfo, setVoteduserinfo] = useState('')
  // const [time, setTime] = useState(0);
  // console.log(time,"a")
  // const clickevent = () => {
  //   console.log('클릭이벤트')
  //   setTime('100')
  // }
  // console.log(time,'b');
  return (

    <div>
      <div id="usercontent">
      </div>
      <Row gutter={[8,8]} justify="space-between">
      {isInMeeting === true ? <TimerMeeting sec={time} getRestTime={getRestTime}/>:<div>아직회의시간이 아님</div>}
      <Col span={2}>  
          <Button block id="chatBtnIcon" onClick={() => action('gameInfo/setChatModalOpen', true)}>
            <MessageTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
          </Button>
        </Col>
      </Row>
      <Row >


        <Col span={2}>  

        </Col>
      </Row>
      <ChatComponent/>
      <WebchatMeeting/>
    </div>
  );
};

export default VoteMeeting;