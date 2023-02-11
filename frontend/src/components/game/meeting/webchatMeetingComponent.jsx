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
import VoteResultFrom from './voteResultFrom';
import { COLOR } from "config/texture";

const WebchatMeetingcomponent = (props) => {
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const voteInfo = useSelector(selectVoteInfo).voteResult.voteResults
  // const voteInfo = [{id:"a",from:['b','c','d']},{id:"b",from:['g']},{id:"skip",from:['b','c']},{id:"ab",from:['b','c','d']}]
  const [from,setFrom] = useState([])
  const getFrom = () =>{
    for (let i = 0; i < voteInfo.length; i++) {
      if (props.user.player.id === voteInfo[i].id) {
        return({data:voteInfo[i].from})
        break;
      }
      
    }
  }
  // useEffect(()=>{
  //   // console.log(voteInfo)
  //   if (isInVoteResult) {
  //   for (let i = 0; i < voteInfo.length; i++) {
  //     if (props.user.player.id === voteInfo[i].id) {
  //       setFrom([...voteInfo[i].from]);
  //       console.log(voteInfo[i].from)
  //       console.log(from)

  //       break;
  //     }
      
  //   }

    
  // }},[isInVoteResult])

  return (
    // props.user.key 로 가져온다
    <>

    {/* Todo: 죽은 사람인 경우 유령이미지 보이는 css 추가 */}
        {props.user.player.id && <Card bodyStyle={{backgroundColor: `${COLOR[props.user.player.color]}`, border: 0 }} title={props.user.player.id} size="small" className='position-relative'>
      
      <>
      {/* {isInVoteResult === true&&} */}
      {/* <div className='child1'><VoteResultFrom/></div> */}
      {isInVoteResult === true&&<div className='z-index2'><VoteResultFrom from={getFrom()}/></div>}
      {props.user.player.isAlive === true ||props.user.player.isAlive===undefined?<div className='z-index1'><UserVideoComponent  user={props.user}/></div>
      :<img className='video' src='/testImg/ghost.jpg'/>}
      </>
    </Card>}

    </>


  )
};

export default WebchatMeetingcomponent;