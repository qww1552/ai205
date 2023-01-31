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
      <div>{props.userinfo.id}</div>
      {/* 자바스크립트에서 true false는 출력이 안된다 */}
      {props.userinfo.isAlive === true? <div>살아있음</div> : <div>쥬금</div>}
      <div>{props.userinfo.isVote}</div>
      {/* 투표결과를 보여주는 경우 voteuser를 출력, 아닌경우 투표 여부를 출력 */}
      {isInVoteResult === true ? <div>{props.voteuser}</div>:props.userinfo.isVote === true? <div>투표완</div>:<div>투표안함</div>}
    </div>
  );
};

export default WebchatMeetingcomponent;