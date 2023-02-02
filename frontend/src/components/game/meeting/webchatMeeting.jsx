import React from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectOhterPlayers } from '../../../app/others';
import WebchatMeetingComponent from './webchatMeetingComponent';
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

// Todo: voteInfo에서 정보를 받아옴
// import { selectVoteInfo } from '../../../app/voteInfo';

// 화상채팅컴포넌트만 모아놓은 컴포넌트
const WebchatMeeting = () => {
  // const P = useSelector(selectOhterPlayers).players
  // const me = useSelector(selectMe)
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const [VoteduserInfo, setVoteduserinfo] = useState('')
  const me = useSelector(selectMe).player
  const otherPlayers = [{id:1, isAlive:true,isVote:true,},{id:2, isAlive:true,isVote:true,},{id:3, isAlive:true,isVote:true,},{id:'fd', isAlive:true,isVote:true,}];
  // const me = {id:'myid', isAlive:true, isVote:true}
  // 누가 누구한테 투표했는지 투표결과를 저장할 변수, 나중에 주석해제
  // const voteResult = useSelector(selectVoteInfo).voteResult
  const voteResult = {1:['a','b','c'],2:['a','b','c'],3:['a','b','c'],4:['a','b','c'],5:['a','b','c'],6:['a','b','c'],7:['a','b','c'],8:['a','b','c'],'skip':['3535k']}
  const VoteEvent = (voteduserInfo) => {
    if (voteduserInfo.isAlive) {
      console.log(me)
      console.log(voteduserInfo.id)
      console.log('에게투표함?')
      console.log(isInVote)
      setVoteduserinfo(voteduserInfo)
    }
  }

  const videoUsers = useSelector(selectVideoUsers);
  const  mainUser = useSelector(selectMainUser);
  const dispatch = new useDispatch();
  
  // Todo: 여기서 웹소켓을 통해 누구한테 투표했는지 전송한다
  const submitEvent =() =>{
    console.log({VoteduserInfo},'한테 대충 제출하는 이벤트')
    action('VOTE', { to: "id"})
  }

  const handleSound = (user) => {
    console.log("handleSound~~!")
    dispatch(mutedSound(user));
    dispatch(mutedVideo(user))
  }

  const handleVideo = (user) => {
    console.log("handleVideo!!")
   
  }

  return (
    <div>
      <Row gutter={[8, 8]}>

      <Col span = {8}>
        {/* <Card title={me.id}> */}
      <WebchatMeetingComponent user={mainUser} userinfo={me}/>
      {/* </Card> */}
      </Col>
      <Col span = {16}>
        <div>여기에 무슨정보를 넣는게 좋을까</div>
      </Col>
      {videoUsers.map((sub) => (
        // Todo: 대충 props로 컴포넌트에 otherplayer정보를 넘겨준다
        // <Col onClick={()=>{VoteEvent(otherplayer)}} span={6}>
        <Col className={sub.isSpeaking === true ?"unvoted isSpeaking":"unvoted isNotSpeaking"} span={6}>
        {/* <Card
          title={otherplayer.id} onClick={()=>{VoteEvent(otherplayer)}}> */}
        <WebchatMeetingComponent user={sub}/>
        {/* </Card> */}
        </Col>    
      ))}
      {/* 스킵한 유저의 결과창을 보일곳 */}
      {isInVoteResult === true&&
        <Col span={24}>
          <Card size="small">
          <Button id="voteSkipIcon" onClick={() => console.log("투표 skip")}>
          <DeleteTwoTone twoToneColor='SlateGrey' style={{fontSize: '24px'}}/>
          </Button>
          {voteResult.skip === []?"기권한 사람이 없는 경우 보일 메세지":voteResult.skip}
        </Card>
        </Col>}
      </Row>
      {/* Todo: 대충 props로 컴포넌트에 자기 정보를 넘겨준다 */}
      
      {/* isInVote가 실행되면 활성화 */}
      {/* 죽은 경우에는 투표를 못하니까 표시안함 */}
      {(me.isAlive&&!me.isVoted)&&<button onClick={submitEvent} disabled={isInVote}>제출</button>}
      
    </div>
    
  );
};

export default WebchatMeeting;
//  userinfo={P[sub.nickname]} voteuser={voteResult[sub.nickname]}