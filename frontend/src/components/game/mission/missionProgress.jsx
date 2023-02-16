import { Progress } from 'antd'
import { selectMissionInfo } from 'app/missionInfo';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const MissionProgress = () => {
  const missionProgress = useSelector(selectMissionInfo).totalMissionProgress
  
  // console.log(missionProgress)
  useEffect(() => {
  }, [missionProgress])

  return (
    <>
      <Progress percent={missionProgress} strokeColor="green" trailColor="silver" strokeWidth="15px" showInfo={false}/>
    </>
  );
};

export default MissionProgress;