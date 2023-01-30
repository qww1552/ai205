import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOhterPlayers } from '../../../app/others';
import WebchatMeetingcomponent from './webchatMeetingcomponent';
import { selectMe } from '../../../app/me';
import { selectGameInfo } from '../../../app/gameInfo';

// Todo: voteInfo에서 정보를 받아옴
// import { selectVoteInfo } from '../../../app/voteInfo';

// 화상채팅컴포넌트만 모아놓은 컴포넌트
const WebchatMeeting = () => {
  // const otherplayers = useSelector(selectOhterPlayers).players
  // const me = useSelector(selectMe)
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote

  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const [VoteduserInfo, setVoteduserinfo] = useState('')
  const otherplayers = [{id:1, isAlive:true,isVote:true},{id:2, isAlive:true,isVote:true},{id:3, isAlive:true,isVote:true},{id:4, isAlive:true,isVote:true},{id:5, isAlive:true,isVote:true},{id:6, isAlive:false,isVote:false},{id:7, isAlive:false,isVote:false},{id:8, isAlive:false,isVote:false},{id:9, isAlive:false,isVote:false}]
  const me = {id:'myid'}
  // 누가 누구한테 투표했는지 투표결과를 저장할 변수, 나중에 주석해제
  // const voteResult = useSelector(selectVoteInfo).vote_result
  const voteResult = {1:['a','b','c'],2:['a','b','c'],3:['a','b','c'],4:['a','b','c'],5:['a','b','c'],6:['a','b','c'],7:['a','b','c'],8:['a','b','c'],9:['a','b','c'],'skip':['3535k']}
  const VoteEvent = (voteduserInfo) => {
    if (voteduserInfo.isAlive) {
      console.log(voteduserInfo.id)
      console.log('에게투표함?')
      console.log(isInVote)
      setVoteduserinfo(voteduserInfo)
    }
  }
  // Todo: 여기서 웹소켓을 통해 누구한테 투표했는지 전송한다
  const submitEvent =() =>{
    console.log({VoteduserInfo},'한테 대충 제출하는 이벤트')
  }
  return (
    <div>
      
      {otherplayers.map((otherplayer) => (
        // Todo: 대충 props로 컴포넌트에 otherplayer정보를 넘겨준다
        <div key={otherplayer.id} onClick={()=>{VoteEvent(otherplayer)}}>
        <WebchatMeetingcomponent userinfo={otherplayer} voteuser={voteResult[otherplayer.id]}/>
        </div>    
      ))}
      {/* Todo: 대충 props로 컴포넌트에 자기 정보를 넘겨준다 */}
      <WebchatMeetingcomponent userinfo={me.id}/>
      {/* isInVote가 실행되면 활성화 */}
      <button onClick={submitEvent} disabled={!isInVote}>제출</button>
    </div>
    
  );
};

export default WebchatMeeting;