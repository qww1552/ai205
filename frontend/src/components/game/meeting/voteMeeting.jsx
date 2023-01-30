import { selectGameset } from 'app/gameset';
import { selectResult } from 'app/result';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import TimerMeeting from './timerMeeting';
import WebchatMeeting from './webchatMeeting';
import { selectGameInfo } from '../../../app/gameInfo';
import { useEffect } from 'react';

const VoteMeeting = () => {
  const result = useSelector(selectResult).result
  // const time = useSelector(selectGameset).time
  const isInMeeting = useSelector(selectGameInfo).isInMeeting
  const isInVote= useSelector(selectGameInfo).isInVote
  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult
  const time = 100
  useEffect(()=>{
    console.log("a",isInMeeting)
    console.log("b",isInVote)
    console.log("c",isInVoteResult)
    return () =>{
      console.log('사라짐')
    }
  },[])
  // const [VoteduserInfo, setVoteduserinfo] = useState('')
  // const [time, setTime] = useState(0);
  // console.log(time,"a")
  // const clickevent = () => {
  //   console.log('클릭이벤트')
  //   setTime('100')
  // }
  // console.log(time,'b');
  return (

    <div>
      <div id="usercontent">
      </div>
      {/* Todo: 게임방 세팅에서 회의시간 저장한것 받아오기 */}
      {isInMeeting === true ? <TimerMeeting sec={time}/>:<div>아직회의시간이 아님</div>}
      {/* {isInVote === true ? <TimerMeeting sec={time}/>:<div>아직투표시간이 아님</div>} */}
      {/* <button onClick={clickevent}>시간이벤트</button> */}
      <WebchatMeeting/>
    
    </div>
  );
};

export default VoteMeeting;