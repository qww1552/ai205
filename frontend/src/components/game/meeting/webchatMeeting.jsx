import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOhterPlayers } from '../../../app/others';
import WebchatMeetingcomponent from './webchatMeetingcomponent';
import { selectMe } from '../../../app/me';
import { selectGameInfo } from '../../../app/gameInfo';

// 화상채팅컴포넌트만 모아놓은 컴포넌트
const WebchatMeeting = () => {
  // const otherplayers = useSelector(selectOhterPlayers)
  // const me = useSelector(selectMe)
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const [VoteduserInfo, setVoteduserinfo] = useState('')
  
  const otherplayers = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7},{name:8},{name:9}]
  const me = {name:'myname'}
  const VoteEvent = (voteduserInfo) => {
    console.log(voteduserInfo)
    console.log('에게투표함?')
    console.log(isInVote)
    setVoteduserinfo(voteduserInfo)
  }
  const submitEvent =() =>{
    console.log({VoteduserInfo},'한테 대충 제출하는 이벤트')
  }
  return (
    <div>
      {otherplayers.map((otherplayer) => (
        // Todo: 대충 props로 컴포넌트에 otherplayer정보를 넘겨준다
        <div key={otherplayer.name} onClick={()=>{VoteEvent(otherplayer.name)}}>
        <WebchatMeetingcomponent userinfo={otherplayer.name}/>
        </div>    
      ))}
      {/* Todo: 대충 props로 컴포넌트에 자기 정보를 넘겨준다 */}
      <WebchatMeetingcomponent userinfo={me.name}/>
      <button onClick={submitEvent} disabled={!isInVote}>제출</button>
    </div>
    
  );
};

export default WebchatMeeting;