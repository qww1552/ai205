import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Modal, Progress } from "antd"
import { selectGameset } from 'app/gameSet';
import { useSelector } from 'react-redux';

const padNumber = (num, length) => {
  return String(num).padStart(length, '0');
};
const TimerMeeting = (props) => {
  const meetingLimitTime = useSelector(selectGameset).gameSet.meetingLimitTime
  const totalMeetingTime = useSelector(selectGameset).gameSet.meetingLimitTime-5+useSelector(selectGameset).gameSet.voteLimitTime 
  const voteLimitTime = useSelector(selectGameset).gameSet.voteLimitTime
  const gameset = useSelector(selectGameset)

  const tempHour = props.hour ? parseInt(props.hour) : 0;
  const tempMin = props.min ? parseInt(props.min) : 0;
  const tempSec = totalMeetingTime ? parseInt(totalMeetingTime) :0;

  const initialTime = useRef(tempHour * 60 * 60 + tempMin * 60 + tempSec);
  const interval = useRef(null);

  const [hour, setHour] = useState(padNumber(tempHour, 2));
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [sec, setSec] = useState(padNumber(tempSec, 2));

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
      setHour(padNumber(parseInt(initialTime.current / 60 / 60), 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(()=>{
    // console.log(totalMeetingTime,voteLimitTime)
    // console.log(gameset)
  },[totalMeetingTime,voteLimitTime])

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
    }
  }, [sec]);


  return (
    <>
    <div></div>
    <Col span={18}>
      {/* success에서 -1을 한것은 진행중 percent와 겹치지 않게 하기 위해서임 */}
      <Progress percent={initialTime.current/totalMeetingTime*100} success={{ percent: Math.min((Number(voteLimitTime)/Number(totalMeetingTime)*100),initialTime.current/totalMeetingTime*100-1), strokeColor:"#52c41a" }} showInfo={false} strokeWidth={20} strokeColor={(initialTime.current/totalMeetingTime*100>Math.min((Number(voteLimitTime)/Number(totalMeetingTime)*100),initialTime.current/totalMeetingTime*100))?"#13c2c2":"#52c41a"}/>   
      {/* <div>{(initialTime.current/props.sec)*100}</div> */}
    </Col>
    <Col span={4}>남은 시간: {min} : {sec}</Col>
    </>
  );
};

export default TimerMeeting;

