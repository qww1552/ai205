import { selectGameInfo } from 'app/gameInfo';
import React from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';

import UserVideoComponent from "components/webchat/UserVideoComponent";

const WebchatMeetingcomponent = (props) => {
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  
  return (
    // props.userinfo.key 로 가져온다
    <Card title={props.userinfo.id} size="small"
    extra={[
      <CheckSquareTwoTone twoToneColor='LimeGreen' style={{ fontSize: '20px'}}/>," ",
      <CustomerServiceTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px'}}/>," ",
      <AudioTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px'}}/>, " ",
      <AlertTwoTone twoToneColor='Red' style={{ fontSize: '20px'}}/>
  ]}> 
      
      {/* <div>{props.userinfo.id}</div> */}
      {/* 자바스크립트에서 true false는 출력이 안된다 */}
      {props.userinfo.isAlive === true? <div>살아있음</div> : <div>쥬금</div>}
      {/* <div>{props.userinfo.isVote}</div> */}
      {/* 투표결과를 보여주는 경우 voteuser를 출력, 아닌경우 투표 여부를 출력 */}
      {isInVoteResult === true ? <div>{props.voteuser}</div>:props.userinfo.isVote === true? <div>투표완</div>:<div>투표안함</div>}
      {/* <div className="blackBox"/> */}
      {/* <div
      className="stream-container" */}
      {/* // onClick={() => handleSound(mainUser)} */}
    {/* > */}
      <UserVideoComponent user={props.user} />
      {/* </div> */}
      <button onClick={() => console.log(props.user)}>dpd</button>
    </Card>
    
  );
};

export default WebchatMeetingcomponent;