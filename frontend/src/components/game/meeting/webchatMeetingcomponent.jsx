import { selectGameInfo } from 'app/gameInfo';
import React from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import "./style.css"

const WebchatMeetingcomponent = (props) => {
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  return (
    // props.userinfo.key 로 가져온다
    <div className='box'>
      {props.userinfo.isAlive}
      {isInVoteResult === true ? <div>{props.voteuser}</div>:props.userinfo.isVote === true? <div>투표완</div>:<div>투표안함</div>}
    </div>
  );
};

export default WebchatMeetingcomponent;