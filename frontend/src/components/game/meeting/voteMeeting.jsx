import { selectGameset } from 'app/gameset';
import { selectResult } from 'app/result';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ResultMeeting from './resultMeeting';
import TimerMeeting from './timerMeeting';

const VoteMeeting = () => {
  const result = useSelector(selectResult).result
  console.log(result)
  // const time = useSelector(selectGameset).time
  const [time, setTime] = useState(0);
  // console.log(time,"a")

  useEffect(() => {
    console.log(time,"origin")
  },[time])

  const clickevent = () => {
    console.log('클릭이벤트')
    setTime('100')
  }
  // console.log(time,'b');
  return (

    <div>
      <div></div>
      {/* Todo: 게임방 세팅에서 회의시간 저장한것 받아오기 */}
      {time !== 0 ? <TimerMeeting sec={time}/>:<div>아직회의시간이 아님</div>}
      {result.length === 0 ? <div>결과없는경우 보일것</div>:<div><ResultMeeting/></div>}
      <button onClick={clickevent}>시간이벤트</button>
    
    </div>
  );
};

export default VoteMeeting;