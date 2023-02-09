import React from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectOhterPlayers } from '../../../app/others';
import WebchatMeetingcomponent from './webchatMeetingComponent';
import { selectMe } from '../../../app/me';
import { selectGameInfo } from '../../../app/gameInfo';
import { action } from "app/store"
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';
import "./style.css"

import {
  selectMainUser,
  setMyUserName,
  selectVideoUsers,mutedSound,mutedVideo
} from "app/videoInfo";
import { useEffect } from 'react';
import { json } from 'react-router-dom';
import { selectVoteInfo } from 'app/voteInfo';

// Todo: voteInfo에서 정보를 받아옴
// import { selectVoteInfo } from '../../../app/voteInfo';

// 화상채팅컴포넌트만 모아놓은 컴포넌트
const WebchatMeeting = () => {
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const [VoteduserInfo, setVoteduserinfo] = useState('skip')
  const me = useSelector(selectMe)
  const otherPlayers = useSelector(selectOhterPlayers);
  const [skipinfo, setSkipInfo] = useState([])
  // 누가 누구한테 투표했는지 투표결과를 저장할 변수, 나중에 주석해제

  
  // 투표결과를 id로 접근할수 있도록 객체화 시킴
  const voteResult = useSelector(selectVoteInfo).voteResult.voteResults
  const VoteEvent = (voteduserInfo) => {
    if (voteduserInfo.isAlive) {
      console.log(voteduserInfo.id)
      console.log('에게투표함?')
      if (VoteduserInfo === voteduserInfo.id) {
        setVoteduserinfo('skip')
      }
      else{setVoteduserinfo(voteduserInfo.id)}
    }

  }

  const videoUsers = useSelector(selectVideoUsers);
  const mainUser = useSelector(selectMainUser);
  const dispatch = new useDispatch();

  
  // Todo: 여기서 웹소켓을 통해 누구한테 투표했는지 전송한다
  const submitEvent =() =>{
    console.log({VoteduserInfo},'한테 대충 제출하는 이벤트')
    action('VOTE_REQUEST', { to: VoteduserInfo})
  }

  const handleSound = (user) => {
    console.log("handleSound~~!")
    dispatch(mutedSound(user));
    dispatch(mutedVideo(user))
  }

  const handleVideo = (user) => {
    console.log("handleVideo!!")
   
  }

  useEffect(()=>{
    if (isInVoteResult===true) {
    for (let i = 0; i < voteResult.length; i++) {
      if ('skip' === voteResult[i].id) {
        setSkipInfo([...skipinfo, voteResult[i].from])
        break;
      }   
    }
  }},[isInVoteResult])
  // 투표결과를 unpack하는 함수

  return (
    <div>
      <Row gutter={[8, 8]}>
      <Col className={me.isSpeaking === true ?"unvoted isSpeaking":"unvoted isNotSpeaking"} span={6}>
     <WebchatMeetingcomponent user={me} userinfo={me}/>
      </Col>
      {otherPlayers.map((sub) => {     
        return (<>{sub.streamManager!==undefined && (<Col className={sub.isSpeaking === true ?"unvoted isSpeaking":"unvoted isNotSpeaking"} span={6}>
          {/* Todo: 지금은 isAlive, isVoted 값이 초기화가 안된상태라 작동이 안됨... */}
        <div className={sub.player.id === VoteduserInfo?"voted":"unvoted"} onClick={()=>{VoteEvent(sub.player)}}>
          <WebchatMeetingcomponent user={sub}/>
        </div>
        </Col>) }</>)    
      })}
      {/* 스킵한 유저의 결과창을 보일곳 */}
      {isInVoteResult === true&&
        <Col span={24}>
          <Card size="small">
          <DeleteTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
          {skipinfo === []?"아무도 기권하지 않았습니다":skipinfo}
        </Card>
        </Col>}
      </Row>
      <Row justify="center">
      {(me.player.isAlive&&!me.player.isVoted)&&<Button type="primary" onClick={submitEvent} disabled={!isInVote}>{VoteduserInfo === 'skip'?'SKIP':'VOTE'}</Button>}
      </Row>      
      
    </div>
    
  );
};

export default WebchatMeeting;
//  userinfo={P[sub.nickname]} voteuser={voteResult[sub.nickname]}
