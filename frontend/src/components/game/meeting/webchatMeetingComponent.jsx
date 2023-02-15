import { selectGameInfo } from 'app/gameInfo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import {
  AudioTwoTone, CheckSquareTwoTone, AlertTwoTone, SettingTwoTone, MessageTwoTone, CustomerServiceTwoTone, DeleteTwoTone ,SoundTwoTone
} from '@ant-design/icons';

import UserVideoComponent from "components/webchat/UserVideoComponent";
import "./style.css"
import { selectVoteInfo } from 'app/voteInfo';

import VoteResultFrom from './voteResultFrom';
import { COLOR } from "config/texture";
import { action } from 'app/store';

const WebchatMeetingcomponent = (props) => {

  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const voteInfo = useSelector(selectVoteInfo).voteResult.voteResults
  const [from,setFrom] = useState([])
  const getFrom = () =>{
    for (let i = 0; i < voteInfo.length; i++) {
      if (props.user.player.id === voteInfo[i].id) {
        return({data:voteInfo[i].from})
        break;
      }
      
    }
  }
  useEffect(()=>{
    
    console.log(props.user.mutedSound)
  },[props.user.mutedSound])


  return (
    // props.user.key 로 가져온다
    <>
        {props.user.player.id && <Card bodyStyle={{backgroundColor: `${COLOR[props.user.player.color]}`, border: 0 }} title={props.user.player.id} size="small" className='position-relative' extra ={
          (props.isme.isme===false)&&(((props.user.mutedSound === true))?<div onClick={()=>{
            action('others/setOtherSoundOn', props.user.player.id)}}><SoundTwoTone/></div>:<div onClick={()=>{
              action('others/setOtherSoundOff', props.user.player.id)}}><AudioTwoTone/></div>
  )}>
      
      <>

      {isInVoteResult === true&&<div className='z-index2'><VoteResultFrom from={getFrom()}/></div>}
      {props.user.player.isAlive === true ||props.user.player.isAlive===undefined?<div className='z-index1' onClick={()=>{props.voteEvent(props.user.player)}}><UserVideoComponent  user={props.user} /></div>
      :<img className='video' src='/testImg/youDied.png'/>}
      </>
      
    </Card>}

    </>


  )
};

export default WebchatMeetingcomponent;