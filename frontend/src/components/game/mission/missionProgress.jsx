import { Progress } from 'antd'
import { selectMissionInfo,setTotalMissionProgress } from 'app/missionInfo';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action } from "app/store"

const MissionProgress = () => {
  const dispatch = useDispatch()
  const progressPercent = useSelector(selectMissionInfo).totalMissionProgress
  return (
    <>
      <Progress percent={progressPercent} strokeColor="green" trailColor="silver" strokeWidth="15px" showInfo={false}/>
      {/* 미션프로그레스 시험버튼 */}
      <button onClick={()=>{dispatch(setTotalMissionProgress(72))}}>미션프로그레스시험버튼</button>
      
    </>
  );
};

export default MissionProgress;