import { selectGameInfo } from 'app/gameInfo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone
} from '@ant-design/icons';

import UserVideoComponent from "components/webchat/UserVideoComponent";
import "./style.css"
import { selectVoteInfo } from 'app/voteInfo';
import me from 'app/me';

const WebchatMeetingcomponent = (props) => {
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const voteInfo = useSelector(selectVoteInfo).voteResult.voteResults
  // const voteInfo = [{id:"a",from:['b','c','d']},{id:"b",from:['g']},{id:"skip",from:['b','c']},{id:"ab",from:['b','c','d']}]
  const [from,setFrom] = useState('')
  useEffect(()=>{
    console.log(voteInfo)
    if (isInVoteResult) {
    for (let i = 0; i < voteInfo.length; i++) {
      
      if (props.user.player.id === voteInfo[i].id) {
        setFrom(voteInfo[i].from);
        console.log(from)
        break;
      }
      else (
        setFrom('null')
      )
    }
  }},[isInVoteResult])

  return (
    // props.user.key 로 가져온다
    <>

    {/* Todo: 죽은 사람인 경우 유령이미지 보이는 css 추가 */}
        {props.user.player.id && <Card title={props.user.player.id} size="small"
      extra={[
        <CheckSquareTwoTone twoToneColor='LimeGreen' style={{ fontSize: '20px' }} />, " ",
        <CustomerServiceTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px' }} />, " ",
        <AudioTwoTone twoToneColor='RoyalBlue' style={{ fontSize: '20px' }} />, " ",
        <AlertTwoTone twoToneColor='Red' style={{ fontSize: '20px' }} />
      ]}>
      {props.user.player.isAlive === true ||props.user.player.isAlive===undefined?
      <>
      <UserVideoComponent user={props.user} />
      {isInVoteResult === true?<div>{from}</div>:props.user.player.isVoted===true?<div>투표완료</div>:<div>투표아직안함</div>}
      {/* <div>{typeof(props.voteResult)}</div> */}
      </>
      :<img className='video' src='/testImg/ghost.jpg'/>}
    </Card>}

    </>


  )
};

export default WebchatMeetingcomponent;