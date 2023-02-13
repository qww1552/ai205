import { useSelect } from '@react-three/drei';
import { Progress } from 'antd'
import { selectMissionInfo } from 'app/missionInfo';


const MissionProgress = () => {
  const missionProgress = useSelect(selectMissionInfo).totalMissionProgress
  return (
    <>
      <Progress percent={missionProgress} strokeColor="green" trailColor="silver" strokeWidth="15px" showInfo={false}/>
    </>
  );
};

export default MissionProgress;